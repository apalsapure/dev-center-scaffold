window._poc.views.ParamEditorView = Backbone.View.extend({
    template: '#tmplParamEditor',
    rowTemplate: '#tmplFieldRow',

    initialize: function (global, options) {
        this.global = global;
        this.options = options || {};
        this.selector = options.selector;

        this._view = Handlebars.compile($(this.template).html());
        this._rowView = Handlebars.compile($(this.rowTemplate).html());

        // build a local collection
        this.collection = new _poc.models.QueryParamCollection();
        this.listenTo(this.collection, 'add', this.onAdd);
        this.listenTo(this.collection, 'remove', this.onRemove);

        this.detailsView = new _poc.views.DetailsPaneView(this.global, 'text');
    },

    onAdd: function (model) {
        this.addRow(model);
    },

    onRemove: function (model) {
        $('#' + model.cid, this.$el).remove();
    },

    renderTable: function (json) {
        // reset the collection
        this.collection.reset();

        // input is string, convert to json
        if (typeof (json) === 'string')
            json = JSON.parse(json);

        // empty the table
        // TODO: remove this
        this.$table.empty();

        // read each property of json and 
        // build the collection
        var models = [];
        for (var key in json) {
            var val = json[key];
            var model = new _poc.models.QueryParam({
                key: key,
                value: val.value,
                isRequired: val.isRequired
            });
            models.push(model);
        }
        this.collection.add(models);
    },

    render: function ($container) {
        this.$el = $container;

        // render the view
        this.$el.html(this._view({
            cid: this.cid,
            enabled: this.options.readOnly !== undefined ? !this.options.readOnly : true
        }));

        // get the reference of the table
        this.$table = $('table', this.$el);

        // bind the events
        this.bindEvents();

        // render the details view
        this.detailsView.render($('.help-block-container', this.$el));
    },

    addRow: function (model) {
        var that = this;

        // create the row
        var $row = $($.trim(this._rowView({
            field: model
        })));

        // append to table
        this.$table.append($row);

        // shows help and disable the input
        // as keys are not allowed to be edited
        $('input.key', $row).focus(function () {
            var val = $(this).val();
            var match = that.options.mapping[val];
            if (match) {
                match['title'] = val;
            }
            that.detailsView.renderContent(match);
        });

        // remove the parameter
        $('.btn-remove', $row).click(function () {
            that.collection.remove(getModel($(this)));
        });

        if (!model.get('editKey'))
            $('input.key', $row).disableInput();

        // helper function
        var getModel = function ($this) {
            var cId = $this.data('target');
            return that.collection.get(cId);
        };

        if (!this.options.readOnly) {
            // update the value
            $('input', $row).blur(function () {
                var model = getModel($(this));

                var value = $.trim($(this).val());
                if ($(this).hasClass('key'))
                    model.set('key', value);
                else
                    model.set('value', value);

                that.isModelValid(model);
            });
        } else {
            // disable the value text box also
            $('input.value', $row).disableInput();
        }
    },

    bindEvents: function () {
        var that = this,
            hasScroll = false;

        // add header
        $('#addProperty', this.$el).click(function () {
            // to identify user has added the key, add editKey flag
            var model = new _poc.models.QueryParam({
                editKey: true
            });
            that.collection.add([model]);
            setTimeout(function () {
                $('input.key[data-target="' + model.cid + '"').focus();
            }, 100);

            // add a scroller
            if (!hasScroll) {
                $('.header-table-container', that.$el).asScrollable({
                    namespace: "scrollable",
                    contentSelector: "> [data-role='content']",
                    containerSelector: "> [data-role='container']",
                    responsive: true
                });
            }
        });
    },

    updateValue: function (value) {
        this.renderTable(value);
    },

    getJSON: function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    },

    isModelValid: function (model) {
        if (model.get('isRequired') !== true) return;
        // validate key only when user adds it
        var isValid = !((model.get('editKey') && model.get('key') === '') || model.get('value') === '');
        if (isValid)
            $('#' + model.cid, this.$el).removeClass('has-error');
        else
            $('#' + model.cid, this.$el).addClass('has-error');
        return isValid;
    },

    validate: function () {
        var that = this,
        isValid = true;
        this.collection.forEach(function (model) {
            if (that.isModelValid(model) === false) {
                isValid = false;
            }
        });
        return isValid;
    },

    getModel: function () {
        var that = this;
        var json = {};

        this.collection.forEach(function (model) {
            var isRequired;
            for (var key in that.options.mapping) {
                if (key !== model.get('key')) continue;
                isRequired = that.options.mapping[key].isRequired;
                break;
            }
            json[model.get('key')] = {
                value: model.get('value'),
                isRequired: isRequired
            }
        });
        return json;
    },

    getValue: function () {
        var json = {};
        this.collection.forEach(function (model) {
            json[model.get('key')] = model.get('value');
        });
        return json;
    }
});
