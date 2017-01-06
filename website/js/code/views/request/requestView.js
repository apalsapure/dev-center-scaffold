window._poc.views.RequestView = Backbone.View.extend({
    template: '#tmplRequest',

    initialize: function (options, override) {
        this.options = options;
        this.override = override || {};
        this._view = Handlebars.compile($(this.template).html());

        if (!this.override.readOnly) {
            this.listenTo(this.options.http, 'begin', this.onBegin);
            this.listenTo(this.options.http, 'success', this.onEnd);
            this.listenTo(this.options.http, 'error', this.onEnd);

            this.listenTo(this.options.collection, 'change:isActive', this.onEvnvironmentChange);
            this.listenTo(this.options.placeHolderCollection, 'change:value', this.onPlaceHolderValueChange);
        }
    },

    onBegin: function () {
        var that = this;
        this.$button.button('loading');
        $('html,body').animate({
            scrollTop: that.$button.offset().top
        }, 'slow');
    },

    onEnd: function () {
        this.$button.button('reset');
    },

    onEvnvironmentChange: function () {
        this.renderEnvironment();
    },

    buildEditors: function () {
        // build the editors only once
        if (this.editors) return;

        this.editors = [];

        if (this.hasBody()) {
            this.editors.push(new _poc.views.JsonEditorView(this.options, {
                selector: '.request-body',
                property: 'body',
                type: 'request',
                themeModel: this.options.themeModel,
                mapping: this.options.requestBodyMapping,
                readOnly: this.override.readOnly !== undefined ? this.override.readOnly : false
            }));
        }
        if (this.hasParams()) {
            this.editors.push(new _poc.views.ParamEditorView(this.options, {
                selector: '.request-params',
                property: 'params',
                type: 'request',
                mapping: this.options.requestParamsMapping,
                readOnly: this.override.readOnly !== undefined ? this.override.readOnly : false
            }));
        }
    },

    // merge place holder and request object
    mergeObjects: function () {
        var that = this;
        // don't update the body if the view is in read-only mode
        if (!this.override.readOnly) {
            var that = this;
            this.editors.forEach(function (editor) {
                // get the model for current model
                that.options.placeHolderCollection
                    .where({ 'section': 'body' })
                    .forEach(function (model) {
                        var action = model.getAction(that.options.title);
                        if (action) that.updateRequest(action, editor.options.property, model.get('value'), model.get('type'));
                    });
            });
        }

        this.editors.forEach(function (editor) {
            editor.updateValue(that.env.get('request').get(editor.options.property));
        });
    },

    arrayRegex: /\[([\d]+)\]/,
    updateRequest: function (model, property, value, type) {
        if (model.target.indexOf('request') === -1 || value === undefined || model.target.indexOf(property) === -1) return;

        var json = this.env.get('request').get(property),
            subJson = json;

        // split on path, and try to populate the model
        var split = model.path.split('/');
        for (var i = 0; i < split.length; i++) {
            var prop = split[i];
            if (_.isEmpty(prop)) continue;

            // check for array
            var match = prop.match(this.arrayRegex);
            if (match && match.length === 2) {
                prop = prop.replace(match[0], '');
            }

            if (subJson[prop] === undefined && i < split.length - 1) {
                if (match) subJson[prop] = [];
                else subJson[prop] = {};
            }

            var obj = subJson[prop];
            if (typeof (obj) === 'object' && i < split.length - 1) {
                if (match && match.length === 2) {
                    obj = obj[parseInt(match[1])];
                }
                if (obj === undefined) break;
                obj = obj || {};
                subJson = obj;
                continue;
            }
            if (typeof (obj) !== 'object') {
                switch (type) {
                    case 'string':
                        if (!_.isEmpty(value))
                            subJson[prop] = value;
                        break;
                    case 'number':
                        subJson[prop] = parseInt(value, 10);
                        break;
                    case 'decimal':
                        subJson[prop] = parseFloat(value, 10);
                        break;
                    case 'array':
                        subJson[prop] = [];
                        var items = value;
                        items.forEach(function (item) {
                            subJson[prop].push(item);
                        });
                        break;
                }
            } else {
                switch (type) {
                    case 'string':
                        if (!_.isEmpty(value))
                            obj.value = value;
                        break;
                    case 'number':
                        obj.value = parseInt(value, 10);
                        break;
                    case 'decimal':
                        obj.value = parseFloat(value, 10);
                        break;
                    case 'array':
                        obj.value = [];
                        var items = value;
                        items.forEach(function (item) {
                            obj.value.push(item);
                        });
                        break;
                }
            }
        }

        this.env.get('request').set(property, json);
    },

    onPlaceHolderValueChange: function (model) {
        var that = this;
        // Set the active environment
        this.env = this.env || this.collection.active();

        // build the editors if they are not
        if (!this.editors) this.buildEditors();

        // if it's for header ignore it, as header view is listening to it
        if (model.get('section').indexOf('header') !== -1) return;

        var action = model.getAction(this.options.title);
        if (action) {
            this.editors.forEach(function (editor) {
                that.env.get('request').set(editor.options.property, editor.getModel());

                that.updateRequest(action, editor.options.property, model.get('value'), model.get('type'));

                editor.updateValue(that.env.get('request').get(editor.options.property));
            });
        }
    },

    renderEnvironment: function () {
        var that = this;
        // get the active environment
        this.env = this.collection.active();

        var request = this.env.get('request');
        var url = this.env.get('baseUrl') + request.get('url');
        $('.request-url', this.$el).html(url);
        $('.text-request-url', this.$el).val();
        this.mergeObjects();

        // render the header view
        var headers = request.get('headers');
        var headerView = new _poc.views.HeadersView({
            parent: 'request',
            placeHolderCollection: that.options.placeHolderCollection,
            collection: headers,
            title: this.options.title,
            enabled: this.override.readOnly !== undefined ? !this.override.readOnly : true
        });

        // on add/remove of headers, update the count
        function updateCount() { $('#spanHeaderCount', that.$el).html(headers.length); };
        this.listenTo(headers, 'add', updateCount);
        this.listenTo(headers, 'remove', updateCount);
        updateCount();

        headerView.render($('.request-headers', this.$el));
        this.headerView = headerView;

        // for mobile device show tooltip when user tap on text box
        $('.text-request-url', this.$el)
            .val(url)
            .data('content', url)
            .popover();
    },

    hasBody: function () {
        return _.isEmpty(this.env.get('request').get('body')) === false;
    },

    hasParams: function () {
        return _.isEmpty(this.env.get('request').get('params')) === false;
    },

    render: function ($container) {
        var that = this;
        this.$el = $container;

        // get the active environment
        this.env = this.collection.active();

        // dump the html
        this.$el.html(this._view({
            method: this.options.method,
            envs: this.options.collection.toJSON(),
            readOnly: this.override.readOnly !== undefined ? this.override.readOnly : false,
            showBody: this.hasBody(),
            showParams: this.hasParams(),
            uId: _.uniqueId('c')
        }));

        // get the reference of button
        this.$button = $('.btn-primary', this.$el);

        // switch to second tab, as it is always active by default
        $('.nav-small li:nth-child(2) a', this.$el).click();

        // construct the editor
        this.buildEditors();

        this.bindEvents();

        // render the editors
        this.editors.forEach(function (editor) {
            editor.render($(editor.selector, that.$el));
        });

        this.renderEnvironment();
    },

    extractValues: function (request) {
        // don't do anything if view is read only mode
        if (this.override.readOnly) return;

        // check if the request is JSON
        if (typeof (request) === 'string') request = JSON.parse(request);

        var that = this;
        this.options.placeHolderCollection
            .where({ 'section': 'body' })
            .forEach(function (model) {
                var action = model.getAction(that.options.title);
                if (action.target !== 'request.body' || !action.path || action.operation !== 'read') return;
                var json = request,
                    subJson = json;
                var split = action.path.split('/');
                for (var i = 0; i < split.length; i++) {
                    var prop = split[i];
                    if (_.isEmpty(prop)) continue;

                    // check for array
                    var match = prop.match(that.arrayRegex);
                    if (match && match.length === 2) {
                        prop = prop.replace(match[0], '');
                    }

                    if (subJson === undefined || subJson[prop] === undefined) return;

                    var obj = subJson[prop];
                    if (typeof (obj) === 'object' && i < split.length - 1) {
                        if (match && match.length === 2) {
                            obj = obj[parseInt(match[1])];
                        }
                        subJson = obj;
                        continue;
                    }
                    // update the value in place holder collection
                    if (obj !== undefined)
                        model.set('value', obj);
                }
            });
    },

    bindEvents: function () {
        var that = this;

        // For mobile device, text box has the URL
        // Don't allow to edit it
        $('.text-request-url', that.$el).keydown(function (e) {
            e.preventDefault();
            return false;
        });

        // Handle the button click event
        // Validate the request
        // If valid, fire the request
        this.$button.click(function (e) {
            e.preventDefault();

            var message = [];

            // validate editors
            that.editors.forEach(function (editor) {
                if (editor.validate() === false) {
                    // body validator
                    if (editor.options.property === 'body')
                        message.push('Request body is invalid.');
                    else // parameter validator
                        message.push('Request params is invalid.');
                }
            });

            // Validate the headers view
            if (that.headerView.validate() === false)
                message.push('Headers are not set properly.');

            // Hide the error message
            $('#invalidRequest', that.$el).hide();

            // If the message has error, then show the message
            if (message.length) {
                $('#invalidRequest', that.$el).show().html(message.join(' and ') + '.');
                return;
            }

            var request = that.env.get('request');

            var opt = {
                method: that.options.method,
                url: that.env.get('baseUrl') + request.get('url'),
                headers: request.get('headers').toObject()
            };

            that.editors.forEach(function (editor) {
                // if the editor is for body, set the value to body of the request
                if (editor.options.property === 'body') {
                    opt['body'] = JSON.stringify(editor.getValue());
                } else {
                    // if the editor is for params, update the value of URL of the request
                    var params = [];
                    var json = editor.getValue();
                    for (var key in json) {
                        // if value is undefined or empty don't send it
                        if (json[key] === undefined || _.isEmpty(json[key])) continue;
                        // if the parameter is defined in URL, then replace it with key and value
                        // else add them as query string
                        if (opt.url.indexOf(key) !== -1)
                            opt.url = opt.url.replace('{' + key + '}', json[key]);
                        else
                            params.push(key + '=' + json[key]);
                    }
                    // user has defined custom query string
                    // add them to URL
                    if (params.length) {
                        if (opt.url.indexOf('?') === -1) opt.url += '?';
                        else opt.url += '&';
                        opt.url += params.join('&');
                    }
                }
            });

            // extract parameters from the request's body
            that.extractValues(opt.body);

            // make the request
            that.options.http.send(opt);

            return false;
        });
    }
});
