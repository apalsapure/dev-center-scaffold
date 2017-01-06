window._poc.views.JsonEditorView = Backbone.View.extend({
    template: '#tmplJsonEditor',
    _ms: null,
    data: null,
    lines: null,

    initialize: function (global, options) {
        this.global = global;
        this.options = options || {};
        this.selector = options.selector;

        this._view = Handlebars.compile($(this.template).html());
        this.detailsView = new _poc.views.DetailsPaneView(this.global, 'json');
        this.listenTo(this.options.themeModel, 'change', this.switchTheme);
    },

    switchTheme: function () {
        this._ms.updateOptions({
            'theme': this.options.themeModel.get('theme')
        });
    },

    render: function ($container) {
        this.$el = $container;

        this.$el.html(this._view({
            readOnly: this.options.readOnly !== undefined ? this.options.readOnly : false,
            enableFullscreen: screenfull.enabled,
            cid: this.cid
        }));
        this.$editorContainer = $('#editor-container' + this.cid);

        this._ms = monaco.editor.create(document.getElementById('editor-container' + this.cid), {
            value: '{}',
            language: 'json',
            scrollBeyondLastLine: false,
            readOnly: this.options.readOnly !== undefined ? this.options.readOnly : false,
            folding: true,
            theme: this.theme,
            nativeContextMenu: false
        });

        this.detailsView.render($('.help-block-container', this.$el));

        this.bindEvents();

        this.switchTheme();
    },

    updateValue: function (value) {
        if (typeof (value) !== 'string')
            value = JSON.stringify(value, null, 2);

        if (this._ms)
            this._ms.setValue(value);

        this.data = value;
        this.lines = this.data.split('\n');

        this.renderDecoration();
    },

    renderDecoration: function () {
        this.decorations = this.decorations || [];
        // remove old ones
        this._ms.deltaDecorations(this.decorations, []);

        var decorations = [];
        for (var count = 0; count < this.lines.length; count++) {
            var line = this.lines[count];
            var item = this.getSelectedItem(count + 1);
            if (!item || item.isRequired !== true) continue;

            var start = line.indexOf(item.title),
                end = start + item.title.length;
            decorations.push(this._ms.deltaDecorations([], [
	        {
	            range: new monaco.Range(count + 1, start + 1, count + 1, end + 1),
	            options: {
	                inlineClassName: 'required-glyph-margin'
	            }
	        }
            ]));
        }
        this.decorations = decorations;
    },

    getJSON: function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    },

    buildPath: function (key, row, indent) {
        var path = '/' + key;
        while (--row) {
            var rowContent = this.lines[row - 1];
            if ((rowContent.indexOf('{') === rowContent.length - 1) || (rowContent.indexOf('[') === rowContent.length - 1)) {
                var prop = rowContent.split(':')[0].replace(/"/g, ''),
                spaceCount = (prop.match(/ /g) || []).length,
                prop = $.trim(prop);
                if (indent > spaceCount && prop !== '{' && prop !== '[') {
                    path = '/' + prop + path;
                    indent = spaceCount;
                }
            }
        }

        return path;
    },

    getSelectedItem: function (row) {
        var rowContent = this.lines[row - 1];
        if (!rowContent || rowContent.indexOf(':') === -1)
            return;

        // Assumption
        // Key will never have double quotes
        var trimContent = $.trim(rowContent),
            start = trimContent.indexOf('"') + 1,
            end = trimContent.indexOf(":") - 1;

        if (start >= end) return;
        var selectedKey = trimContent.substring(start, end);

        var prop = this.lines[row - 1].split(':')[0].replace(/"/g, ''),
        spaceCount = (prop.match(/ /g) || []).length;

        var item = $.extend({}, true, this.options.mapping[this.buildPath(selectedKey, row, spaceCount)]);
        item.title = selectedKey;
        return item;
    },

    bindEvents: function () {
        var that = this;

        var timerRef, env = this.global.collection.active();
        var request = env.get('request');
        this._ms.onKeyUp(function (e) {
            if (timerRef)
                clearTimeout(timerRef);
            timerRef = setTimeout(function () {
                timerRef = undefined;

                var newData = that._ms.getValue();
                if (that.data == newData) return;
                that.data = newData;

                that.lines = that.data.split('\n');
                that.renderDecoration();

                request.set('body', that.data);
            }, 1000);
        });

        this._ms.onMouseDown(function (e) {
            var selection = e.target.element.innerText.replace(/"/g, '');
            var item = that.getSelectedItem(e.target.position.lineNumber);

            that.detailsView.renderContent(item);
        });

        var selector = $('.pretty-content', that.$el),
            editorHeight = this.$editorContainer.height(),
            target = selector[0],
            top = 0;

        var enterFullscreen = function () {
            setTimeout(function () {
                that.$editorContainer.height($(window).height());
            }, 300);
        }
        var exitFullscreen = function () {
            setTimeout(function () {
                that.$editorContainer.height(editorHeight);
                $('html,body').animate({
                    scrollTop: top
                }, 'fast');
            }, 300);
        }

        // go to full screen
        $('.btn-full', this.$el).click(function () {
            $('.pretty-content', that.$el).toggleClass('fullscreen');
            if (!screenfull.isFullscreen) {
                top = selector.offset().top;
                screenfull.request(target);
                enterFullscreen();
            } else {
                screenfull.exit(target);
                exitFullscreen();
            }
        });

        if (screenfull) {
            $(document).on(screenfull.raw.fullscreenchange, function () {
                if (!screenfull.isFullscreen && $('.pretty-content', that.$el).hasClass('fullscreen')) {
                    $('.pretty-content', that.$el).removeClass('fullscreen');
                    exitFullscreen();
                }
            });
        }

        // change the color of editor
        $('.btn-color', that.$el).click(function () {
            var theme = that.options.themeModel.get('theme');
            theme = theme === 'vs-dark' ? 'vs' : 'vs-dark';
            that.options.themeModel.set('theme', theme);
        });

        // format the json
        $('.btn-format', that.$el).click(function () {
            var content = that._ms.getValue();
            try {
                var json = JSON.parse(content);
                that.updateValue(json);
            } catch (e) {
                alert('Invalid JSON');
            }
        });

        // on window resize update the editor layout
        $(window).resize(function () {
            setTimeout(function () {
                that._ms.layout();
            }, 500);
        });
    },

    validate: function () {
        var json = this.getValue();
        return json !== null;
    },

    getModel: function () {
        return this.getValue();
    },

    getValue: function () {
        var value = {};
        if (this._ms) {
            var data = this._ms.getValue();
            try {
                value = JSON.parse(data);
            } catch (e) { }
        }
        return value;
    }
});
