window._poc.views.HeadersView = Backbone.View.extend({

    template: '#tmplHeaders',
    rowTemplate: '#tmplHeaderRow',
    mapping: null,

    initialize: function (options) {
        this.options = options || {};
        this.parent = options.parent;
        if (this.options.enabled == null)
            this.options.enabled = true;

        this._view = Handlebars.compile($(this.template).html());
        this._rowView = Handlebars.compile($(this.rowTemplate).html());

        this.listenTo(this.collection, 'add', this.onAdd);
        this.listenTo(this.collection, 'remove', this.onRemove);

        this.listenTo(this.options.placeHolderCollection, 'change:value', this.onPlaceHolderValueChange);

        this.detailsView = new _poc.views.DetailsPaneView(options, 'headers');

        this.defaultMapping();
    },

    render: function ($container) {
        var that = this;
        this.$el = $container;

        // render the table
        this.$el.html(this._view({
            enabled: this.options.enabled
        }));
        this.$table = $('table', this.$el);

        // merge place holder and current collection
        this.mergeCollection();

        // render the rows
        this.collection.forEach(function (model) {
            var match = that.mapping[model.get('key').toLowerCase()];
            if (match) model.set('isRequired', match.isRequired);
            that.addRow(model);
        });

        // bind events
        this.bindEvents();

        // render the details view
        this.detailsView.render($('.help-block-container', this.$el));
    },

    mergeCollection: function () {
        var that = this;
        this.options.placeHolderCollection.forEach(function (item) {
            if (_.isEmpty(item.get('value'))) return;
            var match = that.getMatch(item.get('key'));
            if (match) match.set('value', item.get('value'));
        });
    },

    getMatch: function (key) {
        return this.collection.findWhere({ key: key });
    },

    onPlaceHolderValueChange: function (model) {
        // if it's for body ignore it, as body view is listening to it
        if (model.get('section').indexOf('body') !== -1) return;
        var action = model.getAction(this.options.title);
        if (!action || action.target.indexOf(this.parent) === -1) return;

        // get the matching header
        var match = this.getMatch(model.get('key'));
        if (!match) return;

        // update the UI
        $('input.value[data-target="' + match.cid + '"]', this.$el).val(model.get('value'));
        // update the model
        match.set('value', model.get('value'));
    },

    addRow: function (model) {
        var that = this;
        // get the row
        var $row = $($.trim(this._rowView({
            header: model,
            enabled: this.options.enabled
        })));

        // add to table
        this.$table.append($row);

        // helper function
        var getModel = function ($this) {
            var cId = $this.data('target');
            return that.collection.get(cId);
        };

        // bind the events
        // shows help
        $('input.key', $row).focus(function () {
            var val = $(this).val();
            var match = that.mapping[val.toLowerCase()];
            if (match) {
                match['title'] = val;
            }
            that.detailsView.renderContent(match);
        });

        // remove the header
        $('.btn-remove', $row).click(function () {
            that.collection.remove(getModel($(this)));
        });

        if (this.options.enabled) {
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
            $('input', $row).disableInput();
        }
    },

    bindEvents: function () {
        var that = this,
            hasScroll = false;

        // add header
        $('#addHeader', this.$el).click(function () {
            var model = new _poc.models.Header();
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

    onAdd: function (model) {
        this.addRow(model);
    },

    onRemove: function (model) {
        $('#' + model.cid, this.$el).remove();
    },

    isModelValid: function (model) {
        var isValid = !(model.get('key') === '' || model.get('value') === '');
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

    defaultMapping: function () {
        this.mapping = {
            'content-type': {
                description: 'The Content-Type header field is used to specify the nature of the data in the body of an entity, by giving type and subtype identifiers, and by providing auxiliary information that may be required for certain types.<br/>After the type and subtype names, the remainder of the header field is simply a set of parameters, specified in an attribute/value notation. The set of meaningful parameters differs for the different types.',
                isRequired: true,
                sampleValue: 'application/json'
            },
            'accept-encoding': {
                description: 'The Accept-Encoding request HTTP header advertises which content encoding, usually a compression algorithm, the client is able to understand. Using content negotiation, the server selects one of the proposals, uses it and informs the client of its choice with the Content-Encoding response header. <br/> Even if both the client and the server supports the same compression algorithms, the server may choose not to compress the body of a response, if the identity value is also acceptable. Two common cases lead to this:<ul><li>The data to be sent is already compressed and a second compression won\'t lead to smaller data to be transmitted. This may the case with some image formats;</li><li>The server is overloaded and cannot afford the computational overhead induced by the compression requirement. Typically, Microsoft recommends not to compress if a server use more than 80 % of its computational power.</li></ul>',
                isRequired: true,
                sampleValue: 'gzip, deflate'
            },
            'accept-language': {
                description: 'The Accept-Language header is used to indicate the language preference of the user. It is a list of values with quality factors.',
                isRequired: false,
                sampleValue: 'en-US'
            },
            'oski-tenantid': {
                description: 'Tenant ID. This is used to identify the tenant that is making the request. If you do not know your tenant ID, you can obtain this information from the Management Console.',
                isRequired: true,
                sampleValue: 'Demo'
            },
            'oski-useripaddress': {
                description: 'IP address of the customer. The customer is the end-user who is making the booking. Ensure that your integration passes the customer\'s IP address instead of your own IP address. This is required for suppliers who have IP-restricted access to their inventory.<br/>The customer\'s IP address helps determine their location and assign the correct payment gateway. The IP address can also be used for fraud recovery and other analytics.',
                isRequired: false,
                sampleValue: '127.0.0.1'
            },
            'oski-correlationid': {
                description: 'This ID is returned for logging and debugging purpose. If you encounter any issue in your API calls, you must provide this ID to our support executive.'
            }
        }
    }
});
