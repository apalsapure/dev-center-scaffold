window._poc.views.DetailsPaneView = Backbone.View.extend({
    template: '#tmplDetailsPane',
    height: 395,
    jsonHelp: {
        helpText: '<i>Click the JSON property to view its description.</i>',
        infoText: '<i>Note: If you update the sample code, click the <strong>Format JSON</strong> icon (<i class="fa fa-indent font-14 mls mrs"></i>) at the top-right corner of the editor to ensure that the property description appears correctly.</i>'
    },

    headerHelp: {
        helpText: '<i>Click the header name to view its description.</i>'
    },

    textHelp: {
        helpText: '<i>Click the property to view its description.</i>'
    },

    initialize: function (options, type) {
        this.type = type || 'json';
        this.options = options || {};
        this._view = Handlebars.compile($(this.template).html());
        this._enumView = Handlebars.compile($('#tmplSampleEnumArray').html());
        this._objectView = Handlebars.compile($('#tmplSampleObject').html());
    },

    render: function ($container) {
        this.$el = $container;
        this.renderContent();
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        $(window).resize(function () {
            setTimeout(function () {
                that.renderScroll();
            }, 500);
        });
    },

    renderScroll: function () {
        var parentHeight = this.$el.parent().height(), height = this.height;
        if (height < parentHeight) height = parentHeight;

        $('.editor-help-text-container', this.$el).height(height - 60);
        // apply scroll plugin
        $('.editor-help-text-container', this.$el).asScrollable({
            namespace: "scrollable",
            contentSelector: "> [data-role='content']",
            containerSelector: "> [data-role='container']",
            responsive: true
        });
    },

    renderContent: function (item) {
        if (item) {
            if (item.description) item.content = marked(item.description);
            if (item.sampleValue) {
                if (typeof (item.sampleValue) === 'string')
                    item.sampleValueHtml = this._objectView({ item: { value: item.sampleValue } });
                else if (item.sampleValue instanceof Array)
                    item.sampleValueHtml = this._enumView({ items: item.sampleValue });
                else if (item.sampleValue instanceof Object)
                    item.sampleValueHtml = this._objectView({ item: item.sampleValue });
            }
        }
        var help = this.headerHelp;
        switch (this.type) {
            case 'json':
                help = this.jsonHelp;
                break;
            case 'text':
                help = this.textHelp;
                break;

        }
        this.$el.html(this._view({
            item: item,
            help: help
        }));

        // scroll is required when there is some content
        if (item)
            this.renderScroll();
    }
});