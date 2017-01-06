window._poc.views.ConsoleView = Backbone.View.extend({
    template: '#tmplConsole',

    initialize: function (options) {
        this.options = options;

        this._view = Handlebars.compile($(this.template).html());

        this.requestView = new _poc.views.RequestView(this.options);
        this.responseView = new _poc.views.ResponseView(this.options);
        
        this.listenTo(this.options.http, 'begin', this.onBegin);
        this.listenTo(this.options.http, 'success', this.onEnd);
        this.listenTo(this.options.http, 'error', this.onEnd);
    },

    render: function ($container) {
        this.$el = $container;

        this.$el.html(this._view({ title: this.options.title }));

        this.requestView.render($('.request-container', this.$el));
        this.responseView.render($('.response-container', this.$el));

        this.bindEvents();

        this.renderResponse();
    },

    bindEvents: function () {
        var that = this;
        $('.switch-button', this.$el).click(function (e) {
            that.sampleView.render(that.$el);
        });
    },

    onBegin: function () {
        this.responseView.renderLoader();
    },

    buildModel: function (response) {
        var headers = new _poc.models.HeaderCollection();
        headers.build(response.headers);
        var model = new _poc.models.Response({
            headers: headers,
            body: response.body,
            status: response.status,
            time: response.time,
            isLive: true
        });
        return model;
    },

    onEnd: function (response) {
        var env = this.options.collection.active();
        var response = this.buildModel(response);
        env.set('response', response);
        this.renderResponse();
    },

    renderResponse: function () {
        var env = this.options.collection.active();
        var response = env.get('response');
        $('.response-header', this.$el).hide();
        if (response.get('isLive')) {
            $('.response-header', this.$el).show();
            this.responseView.renderResponse(response);
        }
    }
});
