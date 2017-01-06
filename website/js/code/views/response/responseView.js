window._poc.views.ResponseView = Backbone.View.extend({
    template: '#tmplResponse',

    status: {
        200: '<strong>200 OK</strong><br/>Standard response for successful HTTP requests.',
        201: '<strong>201 Created</strong><br/>The request has been fulfilled, resulting in the creation of a new resource.',
        202: '<strong>202 Accepted</strong><br/>The request has been accepted for processing, but the processing has not been completed.',
        204: '<strong>204 No Content</strong><br/>The server successfully processed the request and is not returning any content.',
        400: '<strong>400 Bad Request</strong><br/>The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).',
        401: '<strong>401 Unauthorized</strong><br/>Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.',
        403: '<strong>403 Forbidden</strong><br/>The request was a valid request, but the server is refusing to respond to it. The user might be logged in but does not have the necessary permissions for the resource.',
        404: '<strong>404 Not Found</strong><br/>The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.',
        500: '<strong>500 Internal Server Error</strong><br/>A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.',
        502: '<strong>502 Bad Gateway</strong><br/>The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
        503: '<strong>503 Service Unavailable</strong><br/>The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.',
        504: '<strong>504 Gateway Timeout</strong><br/>The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.',
        520: '<strong>520 Unknown Error</strong><br/>The 520 error is used as a "catch-all response for when the origin server returns something unexpected", listing connection resets, large headers, and empty or invalid responses as common triggers.'
    },

    initialize: function (options, override) {
        this.options = options;
        this.override = override || {};
        this._view = Handlebars.compile($(this.template).html());

    },

    render: function ($container) {
        this.$el = $container;
        this.$el.html(this._view({
            uId: _.uniqueId('c')
        }));

        this.buildEditor();
    },

    buildEditor: function () {
        if (this.editor) return;
        this.editor = new _poc.views.JsonEditorView(this.options, {
            type: 'response',
            selector: '.response-body',
            themeModel: this.options.themeModel,
            mapping: this.options.responseBodyMapping,
            readOnly: this.override.readOnly !== undefined ? this.override.readOnly : true
        });
    },

    renderLoader: function () {
        var that = this;
        $('.response-loader', this.$el).parent().removeClass('hide');
        $('.response', this.$el).addClass('hide');
    },
    arrayRegex: /\[([\d]+)\]/,
    extractValues: function (response) {
        // don't do anything if view is read only mode
        if (this.override.readOnly) return;
        var that = this;
        this.options.placeHolderCollection
            .where({ 'section': 'body' })
            .forEach(function (model) {
                var action = model.getAction(that.options.title);
                if (action.target !== 'response.body' || !action.path || action.operation === 'read') return;
                var json = response,
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

    renderResponse: function (response) {
        var that = this;

        $('.response-loader', this.$el).parent().addClass('hide');

        $('.response', this.$el).removeClass('hide');

        // for 204 status code there is no body
        if (response.get('status') !== 204) {
            // switch to body tab, 
            // as Monaco editor fail to render correctly if the element which contains it is not visible to user
            $('.nav-small li:nth-child(2) a', this.$el).show().click();

            this.extractValues(response.get('body'));

            this.editor.render($(this.editor.selector, this.$el));

            this.editor.updateValue(response.get('body'));
        } else {
            $('.nav-small li:nth-child(2) a', this.$el).hide();
            $('.nav-small li:nth-child(1) a', this.$el).click();
        }

        var headers = response.get('headers');
        var headerView = new _poc.views.HeadersView({
            parent: 'response',
            placeHolderCollection: that.options.placeHolderCollection,
            collection: headers,
            enabled: this.override.readOnly !== undefined ? !this.override.readOnly : false
        });
        $('#spanHeaderCount', this.$el).html(headers.length);
        headerView.render($('.response-headers', this.$el));
        this.headerView = headerView;

        // render the stats
        if (response.get('status') && !this.override.readOnly) {
            var status = this.status[response.get('status')];
            status = status || 'No information found for HTTP Status Code: ' + response.get('status');
            $('.response-time', this.$el)
                .popover()
                .html(response.get('time') + ' ms');
            $('.response-status', this.$el)
                .popover({
                    content: status,
                    html: true
                })
                .html(response.get('status'));
        } else {
            $('.status-view', this.$el).remove();
        }
    }
});
