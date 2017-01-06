window._poc.views.HarnessView = Backbone.View.extend({
    initialize: function () {
        var that = this;
        this.listenTo(this.themeModel, 'change', function () {
            Store.set('default_theme', that.themeModel.get('theme'));
        });

        // To update theme across tabs
        setInterval(function () {
            that.themeModel.set('theme', Store.get('default_theme'));
        }, 2000);

        // check if debug mode is enabled
        this.enableDebug = this._isDebugEnabled();
    },

    themeModel: new Backbone.Model(),

    jsonMimeType: 'application/json',

    _isDebugEnabled: function () {
        var query = _poc.utils.parseQuery();
        if (query._debug === undefined || query._debug.toLowerCase() !== 'true') return false;
        return true;
    },

    render: function (url) {
        // set the default theme
        this.themeModel.set('theme', Store.get('default_theme') || 'vs-dark');

        // add a temporary loader
        $('.link').each(function (i, ele) {
            var $loader = $($('#tmplLoader').html());
            $loader.addClass('temp-loader').children().height(80);
            $loader.insertAfter($(ele));
        });


        var that = this;
        var indexPromise = $.get(url),
            configPromise = $.get('config.json'),
            data, config = {
                placeHolders: []
            },
            counter = 2;

        indexPromise.done(function (response, status) {
            if (status !== 'success') return;
            data = response;
            process();
        });

        configPromise.done(function (response, status) {
            if (status === 'success') config = response;
        }).always(function () {
            process();
        });

        function process() {
            if (--counter !== 0) return;

            // remove the temporary loaders
            $('.temp-loader').remove();

            var subUrl;
            // create a collection of environments
            var rootEnvironmentCollection = new _poc.models.EnvironmentCollection(),
                envs = [];
            _.forEach(window.environments, function (env) {
                env['isActive'] = false;
                envs.push(env);
            });
            rootEnvironmentCollection.add(envs);

            // build place holder collection using local store
            _.forEach(config.placeHolders, function (ph) {
                if (!ph.store) return;
                var val = Store.get(ph.store);
                if (val === undefined) return;
                ph.value = val;
            });
            var placeHolderCollection = new window._poc.models.PlaceHolderCollection(config.placeHolders);

            // render the switch view
            this.switcherView = new _poc.views.SwitcherView({
                environmentCollection: rootEnvironmentCollection,
                collection: placeHolderCollection
            });

            var getMatchingPlaceHolders = function (content) {
                var items = [];
                placeHolderCollection.forEach(function (model) {
                    var match;
                    _.forEach(model.get('actions'), function (action) {
                        if (!match && content === action.name) match = true;
                    });
                    if (match) items.push(model);
                });

                return new window._poc.models.PlaceHolderCollection(items);
            }

            var valueRegex = /{([a-zA-Z]+)\|([\w- \/,]+)\|(\d+)}/;

            var translateValue = function (value) {
                if (value === undefined) return;
                var match = value.match(valueRegex)
                if (match && match.length === 4) {
                    try {
                        var format = match[2],
                            number = parseFloat(match[3]);
                        switch (match[1]) {
                            case 'date':
                                value = moment().add(number, 'days').format(format);
                                break;
                        }
                    } catch (e) { }
                }
                return value;
            };

            // iterate on every method placeholder and render the harness view
            $('.link').each(function (i, ele) {
                var $ele = $(ele);
                var content = $.trim($ele.html());
                var paths = data.paths;

                $.each(paths, function (j, path) {
                    subUrl = j;
                    $.each(path, function (k, resource) {
                        if (!resource) return;

                        // which method to use
                        var method, action;
                        if (resource['post']) {
                            method = resource['post'];
                            action = 'POST';
                        } else if (resource['get']) {
                            method = resource['get'];
                            action = 'GET';
                        } else if (resource['put']) {
                            method = resource['put'];
                            action = 'PUT';
                        } else if (resource['delete']) {
                            method = resource['delete'];
                            action = 'DELETE';
                        }

                        // match the content of html tag with the summary of the resource
                        if (!method || method.summary !== content)
                            return;

                        var requestHeaders,
                            requestParams = {},
                            requestBody = {},
                            responseHeaders,
                            responseBody = {},
                            requestParamsMapping = {
                                debug: {
                                    isRequired: false,
                                    description: 'Send this parameter to enable debug mode in the api',
                                    type: 'boolean',
                                    sampleValue: 'true'
                                }
                            },
                            requestBodyMapping = {},
                            responseBodyMapping = {};

                        if (that.enableDebug) {
                            requestParams['debug'] = {
                                isRequired: false,
                                value: 'true'
                            };
                        }

                        // Helper functions
                        // Recursive function to load individual property and it's description
                        var addMapping = function (mapping, input, required, path) {
                            path = path || '',
                            required = required || [];

                            // iterate on properties
                            for (var key in input) {
                                var obj = input[key];
                                // build the path
                                var subPath = path + '/' + key;

                                // SPECIAL CASE
                                // When root element is an array, parser adds __array at the root of the schema
                                // skip this as mapping won't require it
                                if (key === '__array') subPath = null;
                                else {
                                    if (obj.type === 'string' && obj.sampleValue && obj.sampleValue.type === 'string') {
                                        obj.sampleValue = translateValue(obj.sampleValue.value);
                                    }
                                    // for the path, add mapping
                                    mapping[subPath] = {
                                        type: obj.type,
                                        description: obj.description,
                                        sampleValue: obj.sampleValue,
                                        isRequired: required.indexOf(key) !== -1
                                    };
                                }
                                // for object build mapping for `properties`
                                // for array build mapping for `items`
                                if (obj.type === 'object') {
                                    addMapping(mapping, obj.properties, obj.required, subPath);
                                } else if (obj.type === 'array' && obj.items) {
                                    if (subPath !== null) {
                                        if (obj.items.type && !_.isEmpty(obj.items.type)) mapping[subPath].itemType = obj.items.type;
                                        else mapping[subPath].itemType = 'object';
                                    }
                                    addMapping(mapping, obj.items.properties, obj.items.required, subPath);
                                }
                            }
                        };
                        // builds the environment collection
                        var getEnvCollection = function () {
                            // Build environment collection
                            var envs = [];

                            var requestModel = new _poc.models.Request({
                                url: subUrl,
                                headers: requestHeaderCollection.clone(),
                                params: requestParams,
                                body: requestBody
                            });
                            var responseModel = new _poc.models.Response({
                                headers: responseHeaderCollection.clone(),
                                body: responseBody,
                                status: httpStatusCode
                            });

                            _.forEach(window.environments, function (env) {
                                var env = new _poc.models.Environment({
                                    type: env.type,
                                    baseUrl: env.baseUrl,
                                    request: requestModel,
                                    response: responseModel
                                });
                                envs.push(env);
                            });
                            var envCollection = new _poc.models.EnvironmentCollection(envs);

                            // when ever environment in root environment collection is changed, update active flag, so that view can pick active envrionment
                            envCollection.listenTo(rootEnvironmentCollection, 'change:isActive', function (model) {
                                envCollection.forEach(function (env) {
                                    if (env.get('type') === model.get('type')) env.set('isActive', true);
                                    else env.set('isActive', false, { silent: true });
                                });
                            });

                            return envCollection;
                        };

                        var updateJSON = function (json) {
                            for (var key in json) {
                                var value = json[key];
                                if (value instanceof Array) {
                                    $.each(value, function (index, item) {
                                        if (typeof (item) === 'object') {
                                            // update object recursively
                                            item = updateJSON(item);
                                        } else if (typeof (item) === 'string') {
                                            value.splice(index, 1, translateValue(item));
                                        }
                                    });
                                } else if (typeof (value) === 'object') {
                                    // update object recursively
                                    value = updateJSON(value);
                                } else if (typeof (value) === 'string') {
                                    json[key] = translateValue(value);
                                }
                            }
                            return json;
                        }

                        // PARSE REQUEST //
                        // Assumption: body parameter will be only ONE
                        // depending upon the parameter.in, parse parameter
                        if (method.parameters instanceof Array) {
                            _.forEach(method.parameters, function (parameter) {
                                // get the request headers
                                if (parameter.headers) requestHeaders = parameter.headers;

                                // parameter should be in URL path
                                if (parameter.in === 'path') {
                                    // build the JSON, which is similar to the request body
                                    // so that same infrastructure for place holder can be used
                                    requestParams[parameter.name] = {
                                        value: parameter.sampleValue,
                                        isRequired: parameter.required
                                    };
                                    // build the mapping
                                    requestParamsMapping[parameter.name] = {
                                        type: parameter.type,
                                        description: parameter.description,
                                        sampleValue: parameter.sampleValue,
                                        isRequired: parameter.required
                                    }
                                } else if (parameter.in === 'body') { // parameter is body
                                    // looking at the schema, build the path and add the mapping
                                    // so that when details of property are required, it can be found using the path
                                    if (parameter.schema && parameter.schema.properties)
                                        addMapping(requestBodyMapping, parameter.schema.properties, parameter.schema.required);
                                    // if parameter has body, it is the body of the request
                                    if (parameter.body)
                                        requestBody = JSON.parse(parameter.body);

                                    requestBody = updateJSON(requestBody);
                                }
                            });
                        }

                        // PARSE RESPONSE //
                        // Start the translation
                        var response,
                            httpStatusCode;

                        var trySetStatus = function (status) {
                            if (!method.responses[status]) return;
                            httpStatusCode = status;
                            response = method.responses[status];
                        };

                        trySetStatus(200);
                        trySetStatus(201);
                        trySetStatus(202);
                        trySetStatus(204);

                        // Set default response header
                        responseHeaders = { 'Content-Type': that.jsonMimeType };
                        if (response.examples) {
                            // Response Headers
                            if (response.examples.headers && !_.isEmpty(response.examples.headers))
                                responseHeaders = response.examples.headers;
                            // Response Body
                            if (response.examples[that.jsonMimeType]) {
                                responseBody = response.examples[that.jsonMimeType];
                            }
                        }

                        // Response Mapping
                        if (response.schema)
                            addMapping(responseBodyMapping, response.schema.properties);

                        // Header Collections
                        var requestHeaderCollection = new _poc.models.HeaderCollection().build(requestHeaders);
                        var responseHeaderCollection = new _poc.models.HeaderCollection().build(responseHeaders);

                        // Build Environment Collection
                        var consoleEnvCollection = getEnvCollection(),
                            sampleEnvCollection = getEnvCollection();

                        var $parent = $ele.parent(),
                            $container = $('<div class="harness-container"></div>');

                        var getOptions = function (envCollection) {
                            return {
                                method: action,
                                http: new _poc.models.Http(),
                                themeModel: that.themeModel,
                                collection: envCollection,
                                requestParamsMapping: requestParamsMapping,
                                requestBodyMapping: requestBodyMapping,
                                responseBodyMapping: responseBodyMapping,
                                switcherView: that.switcherView,
                                placeHolderCollection: getMatchingPlaceHolders(content),
                                title: content
                            };
                        };

                        // Build the options for the view
                        var consoleOptions = getOptions(consoleEnvCollection),
                            sampleOptions = getOptions(sampleEnvCollection);

                        // add an anchor which will initiate rendering of test harness
                        $parent.append('<blockquote class="no-border margin-top-25 blockquote blockquote-action blockquote-info"><a href="#">' + content + ' </a><i class="fa fa-angle-right font-size-30 pull-right action-angle-right visible-lg visible-md"><i></blockquote>');

                        // bind click event
                        $('a', $parent).click(function (e) {
                            e.preventDefault();

                            $parent.html($('#tmplLoader').html());
                            setTimeout(function () {
                                require(['vs/editor/editor.main'], function () {
                                    $parent.html($container);
                                    var view = new _poc.views.SampleView(sampleOptions);
                                    view.consoleView = new _poc.views.ConsoleView(consoleOptions);
                                    view.consoleView.sampleView = view;
                                    view.render($container);

                                    // FIX FOR IE //
                                    // In IE, the editor must be completely surrounded in the body element, 
                                    // otherwise the hit testing we do for mouse operations does not work. 
                                    // You can inspect this using F12 and clicking on the body element and 
                                    // confirm that visually it surrounds the editor.
                                    setTimeout(function () {
                                        $(document.body).height($('.body-container').height())
                                    }, 100);
                                });
                            }, 0);
                        });
                    });
                });
            });

            setTimeout(function () {
                // set the active environment
                var env = Store.get('default_env'),
                    envFound = false;
                if (!env) env = window.default_env;
                rootEnvironmentCollection.forEach(function (model) {
                    if (model.get('type') === env) {
                        model.set('isActive', true);
                        envFound = true;
                    }
                });
                if (!envFound) rootEnvironmentCollection.first().set('isActive', true);
            }, 100);

        }
    }
});
