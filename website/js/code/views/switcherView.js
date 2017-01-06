window._poc.views.SwitcherView = Backbone.View.extend({
    template: '#tmplSwitch',

    initialize: function (options) {
        this.options = options;
        this._view = Handlebars.compile($(this.template).html());
        this.listenTo(this.options.environmentCollection, 'change:isActive', this.onEnvironmentChange);
        this.listenTo(this.options.collection, 'change:value', this.onValueChange);
        this.render();
    },

    _getBodyItems: function () {
        var items = [];
        this.collection
            .where({ section: 'body' })
            .forEach(function (item) {
                // show items which are targeted to Request. Bug #86 (https://github.com/apalsapure/oski-dev-center/issues/86)
                var match = _.find(item.get('actions'), function (action) {
                    return action.target === 'request.params' || action.target === 'request.body'
                });
                if (match) items.push(item);
            });

        return items;
    },

    render: function () {
        var html = this._view({
            envs: this.options.environmentCollection.toJSON(),
            bodyItems: this._getBodyItems(),
            headerItems: this.collection.where({ section: 'header' })
        });

        this.$el = $($.trim(html));
        this.$el.appendTo($(document.body));
        this.$handle = $('.handle', this.$el);
        this.$action = $('.action-button', this.$el);
        this.$apply = $('.apply-button', this.$el);
        this.$tabContent = $('.tab-content', this.$el);

        this.bindEvents();
        this.onWindowResize();
    },

    onEnvironmentChange: function (model) {
        var that = this;
        this.$handle.removeClass().addClass('handle ' + model.get('cssClass'));
        this.options.environmentCollection.forEach(function (m) {
            that.$action.removeClass(m.get('cssClass'));
            that.$apply.removeClass(m.get('cssClass'));
        });
        this.$action.addClass(model.get('cssClass'));
        this.$apply.addClass(model.get('cssClass'));
        this.$toggle.html(model.get('name') + '&nbsp;<span class="caret"></span>');
        // update the store
        Store.set('default_env', model.get('type'));
    },

    onValueChange: function (model) {
        // update the store
        var storePath = model.get('store')
        if (storePath)
            Store.set(storePath, model.get('value'));

        // if change is trigger by this view, ignore
        if (this.igonreChange) {
            this.close();
            return;
        }

        // else update the view accordingly
        $('input[data-target="' + model.get('key') + '"]').val(model.get('value'));
    },

    close: function () {
        this.$el.removeClass('open');
    },

    onWindowResize: function () {
        var height = $(window).height();
        this.$el.height(height);
        this.resizeRightPanel();
    },

    resizeRightPanel: function () {
        var height = $(window).height();
        if (this.$el.hasClass('affix-top'))
            this.$tabContent.height(height - 160);
        else
            this.$tabContent.height(height - 80);

        if (!this.scroll)
            this.scroll = $('#tab-content-scroll').asScrollable({
                namespace: 'scrollable',
                direction: 'vertical',
                contentSelector: '>',
                containerSelector: '>'
            });
    },

    bindEvents: function () {
        var that = this;

        $(window).resize(function () {
            that.onWindowResize();
        }).scroll(function () {
            if (that.$el.hasClass('open')) {
                that.resizeRightPanel();
            }
        });

        $('.handle, .btn-link', this.$el).click(function (e) {
            that.$el.toggleClass('open');
            that.resizeRightPanel();
        });

        this.$toggle = $('.dropdown-toggle', this.$el);
        $('.dropdown-menu a', this.$el).click(function (e) {
            that.env = that.getEnv($(this).data('target'));

            var active = that.options.environmentCollection.active();
            if (active) active.set('isActive', false, { silent: true });

            that.env.set('isActive', true);
        });

        $('.apply-button', this.$el).click(function (e) {
            e.preventDefault();
            that.igonreChange = true;
            $('.form-configuration input', this.$el).each(function (i, ele) {
                var $ele = $(ele);
                var target = $ele.attr('data-target'),
                    value = $.trim($ele.val());
                var item = that.collection.findWhere({ key: target });
                if (!item) return;
                var type = item.get('type');
                if (type === 'number' || type === 'decimal') {
                    var num;
                    if (type === 'number') {
                        num = parseInt(value, 10);
                    } else {
                        num = parseFloat(value);
                    }
                    if (isNaN(num)) {
                        // TODO
                    } else
                        item.set('value', num);
                } else if (type === 'array') {
                    var subType = item.get('subType');
                    var strs = value.split(','),
                        arr = [];
                    _.forEach(strs, function (str) {
                        switch (subType) {
                            case 'number':
                                str = parseInt(str, 10);
                                break;
                            case 'decimal':
                                str = parseFloat(str, 10);
                                break;
                        }
                        arr.push(str);
                    });
                    item.set('value', arr);
                } else item.set('value', value);
            });
            that.igonreChange = false;

            return false;
        })

        this.$el.affix({
            offset: {
                top: function () {
                    var c = that.$el.offset().top, d = -10, e = $("#divHeader").height();
                    return this.top = c - e - d
                }, bottom: function () {
                    return this.bottom = $("#divFooter").outerHeight(!0);
                }
            }
        });
    },

    getEnv: function (type) {
        return this.options.environmentCollection.findWhere({
            type: type
        });
    }
});