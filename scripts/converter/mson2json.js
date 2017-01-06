var fs = require('fs');
var exec = require('child_process').exec;
var nopt = require('nopt');

var url = require('url');
var http = require('http');
var drafter = require('drafter.js');
var uritemplate = require('uritemplate');
var crlf = require('crlf');

var options = nopt({
    'input': String,
    'output': String,
    'reference': String
}, {
    'i': ['--input'],
    'o': ['--output'],
    'r': ['--reference']
});

if (!options.input) {
    console.log("Usage: mson2json -i mson.apib");
    console.log("       mson2json -i mson.apib -o converted.json");
    console.log("       mson2json -i mson.apib -o converted.json -r dataStructure.apib");
    process.exit();
}

var output = options.output || 'output.json';

// Convert CRLF ending to LF
crlf.set(options.input, 'LF', function (err, endingType) {
    if (options.reference) {
        crlf.set(options.reference, 'LF', function (err, endingType) {
            //console.log(endingType);
            execute();
        });
    } else execute();
});

// Execute the translation
function execute() {
    var apibContent = fs.readFileSync(options.input, {
        encoding: 'utf8'
    });

    if (options.reference) {
        apibContent = apibContent + fs.readFileSync(options.reference, {
            encoding: 'utf8'
        });
    }

    var convert = function (apib) {
        try {
            var result = drafter.parse(apib, {
                type: 'ast'
            });

            //fs.writeFileSync(output + 'full', JSON.stringify(result, null, 2));

            return mson2json(result.ast);
        } catch (error) {
            throw error;
        }
    };

    var mson2json = function (apib) {
        var swagger = {};
        swagger.swagger = '2.0';
        swagger.info = {
            'title': apib.name,
            'version': '',
            'description': apib.description
        }
        for (var i = 0; i < apib.metadata.length; i++) {
            var meta = apib.metadata[i];
            if (meta.name.toLowerCase() === 'host') {
                var urlParts = url.parse(meta.value);
                swagger.host = urlParts.host;
                swagger.basePath = urlParts.pathname;
                swagger.schemes = [urlParts.protocol.replace(':', '')];
            }
        }
        swagger.paths = {};
        swagger.definitions = {};
        var dataStructures = [];
        for (var i = 0; i < apib.content.length; i++) {
            // description in Resource group section is discarded
            var category = apib.content[i];
            if (category.element !== 'category')
                continue;
            var groupName = category.attributes ? category.attributes.name : '';
            for (var j = 0; j < category.content.length; j++) {
                var content = category.content[j];
                if (content.element === 'resource') {
                    // (name, description) in Resource section are discarded
                    swaggerDefinitions(swagger.definitions, content);
                    swaggerPaths(swagger.paths, groupName, content);
                    continue;
                }
                if (content.element === 'copy') {
                    continue;
                }
                if (content.element === 'dataStructure') {
                    swagger.definitions[content.content[0].meta.id] = jsonSchemaFromMSON(content);
                    dataStructures.push(content);
                    continue;
                }
            }
        }

        var getElementsByPath = function (path) {
            for (var i = 0; i < apib.content.length; i++) {
                // description in Resource group section is discarded
                var category = apib.content[i];
                if (category.element !== 'category')
                    continue;
                var groupName = category.attributes ? category.attributes.name : '';
                for (var j = 0; j < category.content.length; j++) {
                    var content = category.content[j];
                    if (content.element === 'resource' && content.uriTemplate === path) {
                        for (var k = 0; k < content.actions.length; k++) {
                            var action = content.actions[k];

                        }
                    }
                }
            }
        }

        var addContentElements = function (resources, items) {
            resources.forEach(function (resource) {
                resource.content.forEach(function (rootContent) {
                    if (rootContent.content instanceof Array) {
                        rootContent.content.forEach(function (content) {
                            if (content.element && content.element !== '') items.push(content.element);
                        });
                    }
                });
            });
        }

        var getContentObjectName = function (path) {
            var items = [];
            apib.content.forEach(function (category) {
                if (category.element !== 'category') return;

                var groupName = category.attributes ? category.attributes.name : '';
                category.content.forEach(function (content) {
                    if (content.element === 'resource' && content.uriTemplate === path) {
                        content.actions.forEach(function (action) {
                            action.examples.forEach(function (example) {
                                addContentElements(example.requests, items);
                                addContentElements(example.responses, items);
                            })
                        });
                    }
                });
            });
            return items;
        };

        // some times enum properties have type set as 'string'
        // this will fix it
        var validTypes = ['string', 'boolean', 'enum', 'number', 'array'];


        var updateSchema = function (schema) {
            if (schema.properties === undefined) schema.properties = {};
            if (schema.type !== 'array') return schema;
            schema.properties = {
                __array: {
                    description: 'Root is an array',
                    items: {
                        properties: {},
                        type: 'object'
                    },
                    type: 'array'
                }
            };
            return schema.properties.__array.items;
        };

        for (var path in swagger.paths) {
            var paths = swagger.paths[path];
            for (var i = 0; i < paths.length; i++) {
                var arrayObjects = [];

                // find array properties in request
                var method = paths[i].post || paths[i].put || paths[i].get || paths[i].delete;
                method.parameters.forEach(function (parameter) {
                    if (parameter.schema) {
                        buildObject(parameter.schema.dataStructureRef, updateSchema(parameter.schema));
                    }
                });

                // find array properties in response
                var status = method.responses['200'] || method.responses['201'] || method.responses['202'] || method.responses['203'] || method.responses['204'];
                if (status.schema) {
                    buildObject(status.schema.dataStructureRef, updateSchema(status.schema));
                }
            }
        }

        function getDescriptionForContent(content) {
            if (content && content.meta && content.meta.description) return content.meta.description;
            else return '';
        };

        function getContentFromDataStructureById(id) {
            var content;
            for (var i = 0; i < dataStructures.length; i++) {
                var dataStructure = dataStructures[i];
                var contentLvl1 = dataStructure.content[0];
                if (contentLvl1 && contentLvl1.meta && contentLvl1.meta.id === id && contentLvl1.content) {
                    content = contentLvl1;
                    break;
                }
            }
            return content;
        };

        var getSampleValue = function (value) {
            if (!value.element || !value.content) return;

            var sampleValue;
            switch (value.element) {
                case 'string':
                case 'number':
                case 'boolean':
                    sampleValue = {
                        type: value.element,
                        value: value.content
                    };
                    break;
                case 'enum':
                    sampleValue = [];
                    value.content.forEach(function (content) {
                        sampleValue.push({
                            type: content.element,
                            value: content.content === undefined ? '' : content.content
                        });
                    });
                    break;
            }
            return sampleValue;
        }

        function getObject(object, content) {
            // add object to the properties
            object.properties[content.content.key.content] = {
                properties: {},
                required: [],
                description: getDescriptionForContent(content),
                type: 'object'
            }

            return object.properties[content.content.key.content];
        }

        function populateObject(content, object) {
            // check for required
            if (content.attributes &&
                content.attributes.typeAttributes &&
                content.attributes.typeAttributes.length === 1 &&
                content.attributes.typeAttributes[0] === 'required') {
                if (object.items && object.items.required) {
                    object.items.required.push(content.content.key.content);
                } else {
                    if (!object.required) object.required = [];
                    if (object.required.indexOf(content.content.key.content) === -1)
                        object.required.push(content.content.key.content);
                }
            }

            // for object or for items which are not valid types, go recursive
            if (content.content.key.content === content.content.value.element) {
                var obj = getObject(object, content);
                buildObject(content.content.value.element, obj);
            } else if (content.content.value.element === 'object') {
                if (content.content.value.content instanceof Array) {
                    var obj = getObject(object, content);

                    content.content.value.content.forEach(function (iContentLvl1) {
                        populateObject(iContentLvl1, obj);
                    });
                }
            } else if (validTypes.indexOf(content.content.value.element) === -1) {
                var obj = getObject(object, content);
                buildObject(content.content.value.element, obj);
            } else {
                // populate properties of the object
                if (content.content.value.element !== 'array') {
                    if (content.content.value.element === 'enum') {
                        object.properties[content.content.key.content] = {
                            type: content.content.value.element,
                            description: getDescriptionForContent(content),
                            sampleValue: []
                        };
                        content.content.value.content.forEach(function (item) {
                            object.properties[content.content.key.content].sampleValue.push({
                                type: item.element,
                                value: item.content === undefined ? '' : item.content
                            });
                        });
                    } else {
                        object.properties[content.content.key.content] = {
                            type: content.content.value.element,
                            description: getDescriptionForContent(content),
                            sampleValue: {
                                type: content.content.value.element,
                                value: content.content.value.content
                            }
                        }
                    }
                } else {
                    object.properties[content.content.key.content] = {
                        type: 'array',
                        items: {
                            type: getArraySubType(content),
                            properties: {},
                            required: []
                        },
                        description: getDescriptionForContent(content)
                    };

                    if (content.content.value.content && content.content.value.content instanceof Array) {
                        content.content.value.content.forEach(function (child) {
                            buildObject(child.element, object.properties[content.content.key.content].items);
                        });
                    }
                }
            }
        };

        function getArraySubType(content) {
            if (content.content.value.content instanceof Array
                && content.content.value.content.length
                && typeof (content.content.value.content[0].element) === 'string'
                && validTypes.indexOf(content.content.value.content[0].element) !== -1) {
                return content.content.value.content[0].element;
            } else return 'object';
        };

        function buildObject(id, object) {
            var contentLvl1 = getContentFromDataStructureById(id);
            if (!contentLvl1) return;

            contentLvl1.content.forEach(function (content) {
                // if it's a reference try to load the object
                // else if it's a member then try to populate properties
                if (content.element === 'ref') {
                    buildObject(content.content.href, object);
                } else if (content.element === 'member') {
                    if (content.content.key.element === 'string') {
                        populateObject(content, object);
                    }
                }
            });
        };

        var recursive = function (id, objects, parent) {
            var contentLvl1 = getContentFromDataStructureById(id);
            if (!contentLvl1) return;

            contentLvl1.content.forEach(function (content) {
                // if it's a reference try to load the object
                // else if it's a member then try to populate properties
                if (content.element === 'ref') {
                    recursive(content.content.href, objects, parent);
                } else if (content.element === 'member') {
                    var properties;
                    if (content.content.key.element === 'string') {
                        if (parent) {
                            // is this property required
                            if (content.attributes && content.attributes.typeAttributes && content.attributes.typeAttributes.length === 1 && content.attributes.typeAttributes[0] === 'required') {
                                if (parent.items && parent.items.required)
                                    parent.items.required.push(content.content.key.content);
                                else
                                    parent.required.push(content.content.key.content);
                            }

                            // load individual properties
                            // get property field
                            properties = parent.properties;
                            if (parent.items) {
                                properties = parent.items.properties;
                            }
                            // populate properties
                            if (validTypes.indexOf(content.content.value.element) !== -1) {
                                properties[content.content.key.content] = {
                                    type: content.content.value.element,
                                    description: getDescriptionForContent(content),
                                    sampleValue: getSampleValue(content.content.value)
                                }
                            } else {
                                var elementObj = {
                                    type: 'object',
                                    description: getDescriptionForContent(content),
                                    properties: {},
                                    required: []
                                };
                                properties[content.content.key.content] = elementObj;
                                recursive(content.content.value.element, objects, elementObj);
                            }
                        }
                    }

                    if (content.content.value.element === 'array') {
                        var matches = [];
                        var match;
                        if (properties) {
                            properties[content.content.key.content] = {
                                type: 'array',
                                items: [],
                                description: getDescriptionForContent(content)
                            };
                            matches.push(properties[content.content.key.content]);
                        } else {
                            objects.forEach(function (obj) {
                                if (obj.prop === content.content.key.content) matches.push(obj);
                            });
                        }

                        if (matches.length) {
                            matches.forEach(function (match) {
                                match.items = {
                                    type: 'object',
                                    properties: {},
                                    required: []
                                }
                            });
                        }

                        // iterate on every content of the content value 
                        content.content.value.content.forEach(function (child) {
                            //console.log('Child Content ' + child.element);
                            matches.forEach(function (match) {
                                recursive(child.element, objects, match);
                            });
                        });
                    } else if (content.content.value.element === 'enum') {

                    } else if (content.content.key.content === content.content.value.element) {
                        recursive(content.content.value.element, objects, parent);
                    } else if (validTypes.indexOf(content.content.value.element) === -1) {
                        recursive(content.content.value.element, objects, parent);
                    }
                }
            });
        }

        var populateObject = function (contentObjects, objects) {
            contentObjects.forEach(function (contentObject) {
                recursive(contentObject, objects);
                var tempObj = {
                    properties: {},
                    required: [],
                    type: 'object'
                };
                buildObject(contentObject, tempObj);
                console.log(JSON.stringify(tempObj, null, 3));
            });
        };

        return swagger;
    };

    function swaggerPathName(uriTemplate) {
        var params = {};
        for (var i = 0; i < uriTemplate.expressions.length; i++) {
            var exp = uriTemplate.expressions[i];
            if (!exp.varspecs)
                continue;
            if (exp.operator.symbol === '?')
                continue; // query
            for (var j = 0; j < exp.varspecs.length; j++) {
                var spec = exp.varspecs[j];
                params[spec.varname] = '{' + spec.varname + '}';
            }
        }
        return decodeURIComponent(uriTemplate.expand(params));
    }

    var swaggerDefinitions = function (definitions, resource) {
        var scheme;
        if (resource.name) {
            scheme = searchDataStructure(resource.content); // Attributes 1
            definitions[resource.name] = scheme ? scheme : {};
        }
        if (resource.model.content && resource.model.name) {
            scheme = searchDataStructure(resource.model.content); // Attribute 2
            definitions[resource.model.name + 'Model'] = scheme ? scheme : {};
        }
    };

    var swaggerPaths = function (paths, tag, resource) {
        var uriTemplate = uritemplate.parse(resource.uriTemplate),
        pathName = swaggerPathName(uriTemplate);
        if (!paths[pathName])
            paths[pathName] = [];

        var pathParams = swaggerParameters(resource.parameters, uriTemplate); // for swagger ui
        for (var k = 0; k < resource.actions.length; k++) {
            var action = resource.actions[k];
            if (!action.attributes.uriTemplate) {

                var actionItem = {};
                actionItem[action.method.toLowerCase()] = swaggerOperation(pathParams, uriTemplate, action, tag);
                paths[pathName].push(actionItem);
                continue;
            }
            var attrUriTemplate = uritemplate.parse(action.attributes.uriTemplate),
            attrPathName = swaggerPathName(attrUriTemplate);
            if (!paths[attrPathName])
                paths[attrPathName] = {};
            paths[attrPathName][action.method.toLowerCase()] = swaggerOperation([], attrUriTemplate, action, tag);
        }
    };

    var handleEnums = function (obj) {
        for (var key in obj) {
            var prop = obj[key];
            if (prop.type === 'string' && prop.enum instanceof Array) {
                prop.type = 'enum';
                prop.sampleValue = [];
                prop.enum.forEach(function (e) {
                    prop.sampleValue.push({
                        type: 'string',
                        value: e
                    });
                });
                delete prop.enum;
            } else if (prop.type === 'object' && prop.properties) {
                handleEnums(prop.properties);
            } else if (prop.type === 'array') {
                prop.items.forEach(function (item) {
                    if (item.properties)
                        handleEnums(item.properties);
                });
            }
        }
    };

    var swaggerOperation = function (pathParams, uriTemplate, action, tag) {
        var operation = {
            'responses': swaggerResponses(action.examples),
            'summary': action.name,
            'description': action.description,
            'tags': tag ? [tag] : [],
            'parameters': pathParams.concat(swaggerParameters(action.parameters, uriTemplate))
        }

        var schema = [],
        headers = {}
        body = {},
        scheme = searchDataStructure(action.content); // Attributes 3
        if (scheme)
            schema.push(scheme);
        for (var j = 0; j < action.examples.length; j++) {
            var example = action.examples[j];
            for (var l = 0; l < example.requests.length; l++) {
                var request = example.requests[l];

                var schemaDataStructureRef;
                for (var ii = 0; ii < request.content.length; ii++) {
                    var contentLvl1 = request.content[ii];
                    for (var jj = 0; jj < contentLvl1.content.length; jj++) {
                        var contentLvl2 = contentLvl1.content[jj];
                        schemaDataStructureRef = contentLvl2.element;
                    }
                }

                if (request.schema) { // Schema section in Request section
                    try {
                        // referencing Model's Schema is also here (no need to referencing definitions)
                        scheme = JSON.parse(request.schema);
                        scheme.dataStructureRef = schemaDataStructureRef;
                        if (scheme)
                            schema.push(scheme);
                    } catch (e) { }
                } else {
                    scheme = searchDataStructure(request.content); // Attributes 4
                    if (scheme)
                        schema.push(scheme);
                    if (request.reference) {
                        schema.push({
                            '$ref': '#/definitions/' + request.reference.id + 'Model'
                        });
                    }
                }

                if (request.headers) {
                    for (var m = 0; m < request.headers.length; m++) {
                        headers[request.headers[m].name] = request.headers[m].value;
                    }
                }

                if (request.body) {
                    body = request.body;
                }
            }
        }
        if (schema.length == 1) {
            operation.parameters.push({
                name: 'body',
                in: 'body',
                schema: schema[0],
                headers: headers,
                body: body
            });
        } else if (schema.length > 1) {
            operation.parameters.push({
                name: 'body',
                in: 'body',
                schema: {
                    anyOf: schema
                },
                headers: headers,
                body: body
            });
        } else if (action.method === 'GET') {
            operation.parameters.forEach(function (pa) {
                pa.headers = headers;
            });
        }
        return operation;
    }

    function swaggerParameters(parameters, uriTemplate) {
        var PARAM_TYPES = {
            'string': 'string',
            'number': 'number',
            'integer': 'integer',
            'boolean': 'boolean',
            'bool': 'boolean',
            'array': 'array',
            'file': 'file'
        }
        var params = [];

        for (var l = 0; l < parameters.length; l++) {
            var parameter = parameters[l];
            var param = {
                'name': parameter.name,
                'in': getParamType(parameter.name, uriTemplate),
                'description': parameter.description,
                'required': parameter.required,
                'sampleValue': parameter.example
            }
            if (PARAM_TYPES.hasOwnProperty(parameter.type)) {
                param.type = PARAM_TYPES[parameter.type];
            } else {
                param.type = 'string';
            }
            if (parameter.default) {
                if (param.type === 'number' || param.type === 'integer') {
                    param.default = Number(parameter.default);
                } else {
                    param.default = parameter.default;
                }
            }
            for (var j = 0; j < parameter.values.length; j++) {
                if (!param.enum)
                    param.enum = [];
                param.enum.push(parameter.values[j].value);
            }
            params.push(param);
        }
        return params;
    }

    var searchDataStructure = function (contents) {
        for (var i = 0; i < contents.length; i++) {
            var content = contents[i];
            if (content.element !== "dataStructure")
                continue;
            return jsonSchemaFromMSON(content);
        }
    };

    var jsonSchemaFromMSON = function (content) {
        // for apib._version = "4.0"
        var mson = content.content[0];
        if (mson.element === 'array') {
            if (!mson.content || mson.content.length === 0) {
                return {
                    type: 'array'
                };
            } else if (mson.content.length === 1) {
                return {
                    type: 'array',
                    items: {
                        '$ref': '#/definitions/' + mson.content[0].element
                    }
                };
            } else if (mson.content.length > 1) {
                var items = [];
                for (var i = 0; i < mson.content.length; i++) {
                    items.push({
                        '$ref': '#/definitions/' + mson.content[i].element
                    });
                }
                return {
                    type: 'array',
                    items: {
                        'anyOf': items
                    }
                };
            }
        }
        if (mson.element !== 'object' && !mson.content) {
            return {
                '$ref': '#/definitions/' + mson.element
            };
        }
        // object
        var schema = {};
        schema.type = 'object';
        schema.required = [];
        schema.properties = {};
        if (!mson.content) return schema;

        for (var j = 0; j < mson.content.length; j++) {
            var member = mson.content[j];
            if (member.element !== "member")
                continue;
            // MEMO: member.meta.description
            schema.properties[member.content.key.content] = {
                type: member.content.value.element
            };
            if (!member.attributes || !member.attributes.typeAttributes)
                continue;
            for (var k = 0; k < member.attributes.typeAttributes.length; k++) {
                if (member.attributes.typeAttributes[k] === "required") {
                    schema.required.push(member.content.key.content);
                }
            }
        }
        if (mson.element !== 'object') {
            return {
                'allOf': [{
                    '$ref': '#/definitions/' + mson.element
                }, schema]
            };
        }
        return schema;
    };

    function getParamType(name, uriTemplate) {
        if (!uriTemplate)
            return 'body';
        for (var i = 0; i < uriTemplate.expressions.length; i++) {
            var exp = uriTemplate.expressions[i];
            if (!exp.varspecs)
                continue;
            for (var j = 0; j < exp.varspecs.length; j++) {
                var spec = exp.varspecs[j];
                if (spec.varname === name) {
                    return exp.operator.symbol === '?' ? 'query' : 'path';
                }
            }
        }
        return 'body';
    }

    function swaggerResponses(examples) {
        var responses = {};
        //console.log(examples);
        for (var l = 0; l < examples.length; l++) {
            var example = examples[l];
            //console.log(example);
            for (var m = 0; m < example.responses.length; m++) {
                var response = example.responses[m];
                //console.log(response);
                var swaggerResponse = {
                    "description": http.STATUS_CODES[response.name],
                    "headers": {},
                    "examples": {}
                };
                if (response.schema) {
                    try {
                        swaggerResponse.schema = JSON.parse(response.schema);
                        for (var ii = 0; ii < response.content.length; ii++) {
                            var contentLvl1 = response.content[ii];
                            for (var jj = 0; jj < contentLvl1.content.length; jj++) {
                                if (contentLvl1.content[jj].element === 'array' && contentLvl1.content[jj].content instanceof Array)
                                    swaggerResponse.schema.dataStructureRef = contentLvl1.content[jj].content[0].element;
                                else
                                    swaggerResponse.schema.dataStructureRef = contentLvl1.content[jj].element;
                            }
                        }
                        if (swaggerResponse.schema.properties)
                            handleEnums(swaggerResponse.schema.properties);
                    } catch (e) { }
                }
                if (!swaggerResponse.schema) {
                    var schema = searchDataStructure(response.content); // Attributes in response
                    if (schema)
                        swaggerResponse.schema = schema;
                }
                if (response.body) {
                    try {
                        swaggerResponse.examples["application/json"] = JSON.parse(response.body);
                    } catch (e) { }
                }
                responses[response.name] = swaggerResponse;
            }
        }
        return responses;
    }

    var json = convert(apibContent);
    var data = JSON.stringify(json, null, 4);
    fs.writeFileSync(output, data);
}