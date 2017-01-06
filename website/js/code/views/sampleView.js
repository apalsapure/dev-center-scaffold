window._poc.views.SampleView = Backbone.View.extend({
    template: '#tmplSampleView',

    initialize: function (options) {
        this.options = options;

        this.requestView = new _poc.views.RequestView(this.options, { readOnly: true });
        this.responseView = new _poc.views.ResponseView(this.options, { readOnly: true });

        this._view = Handlebars.compile($(this.template).html());
    },

    render: function ($container) {
        this.$el = $container;

        this.$el.html(this._view({ title: this.options.title }));

        this.requestView.render($('.request-container', this.$el));
        this.responseView.render($('.response-container', this.$el));

        var env = this.options.collection.active();
        var response = env.get('response');
        this.renderResponse(response);

        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        $('.switch-button', this.$el).click(function (e) {
            that.consoleView.render(that.$el);
        });
    },

    renderResponse: function (response) {
        this.responseView.renderResponse(response);
    }
});