window._poc.models.Parameter = Backbone.Model.extend({});
window._poc.models.ParameterCollection = Backbone.Collection.extend({
    model: window._poc.models.Parameter
});

window._poc.models.Environment = Backbone.Model.extend({});
window._poc.models.EnvironmentCollection = Backbone.Collection.extend({
    model: window._poc.models.Environment,
    active: function () {
        return this.findWhere({ isActive: true });
    }
});
window._poc.models.QueryParam = Backbone.Model.extend({
    defaults: {
        key: '',
        value: ''
    }
});
window._poc.models.QueryParamCollection = Backbone.Collection.extend({
    model: window._poc.models.QueryParam
});
window._poc.models.Header = Backbone.Model.extend({
    defaults: {
        key: '',
        value: '',
        isRequired: false
    }
});
window._poc.models.HeaderCollection = Backbone.Collection.extend({
    model: window._poc.models.Header,

    toObject: function () {
        var obj = {};
        this.forEach(function (model) {
            obj[model.get('key')] = model.get('value');
        });
        return obj;
    },

    build: function (obj) {
        var arr = [];
        for (var key in obj) {
            arr.push(new _poc.models.Header({
                key: key,
                value: obj[key]
            }));
        }
        this.add(arr);
        return this;
    }
});

window._poc.models.Request = Backbone.Model.extend({});

window._poc.models.Response = Backbone.Model.extend({});

window._poc.models.Http = Backbone.Model.extend({
    send: function (options) {
        var that = this;

        delete options.headers['Accept-Encoding'];
        delete options.headers['accept-encoding'];
        delete options.headers['oski-userToken'];

        this.trigger('begin');
        var start = new Date();
        $.ajax({
            method: options.method,
            url: options.url,
            data: options.body,
            headers: options.headers,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function (data, textStatus, request) {
            if (request.status === 204) data = {};
            var response = {
                headers: that.getHeaders(request),
                body: data,
                status: request.status,
                time: new Date() - start
            };
            that.trigger('success', response);
        }).error(function (request, status, error) {
            var response = {
                headers: that.getHeaders(request),
                body: {
                    message: 'Something went wrong.'
                },
                status: 520,
                time: new Date() - start
            }
            if (!_.isEmpty(request.responseText) && request.responseText)
                response.body = JSON.parse(request.responseText);
            if (request.status !== 0)
                response.status = request.status;
            that.trigger('error', response);
        });
    },

    getHeaders: function (request) {
        var split = request.getAllResponseHeaders().split('\n'),
        headers = {};
        $.each(split, function (i, s) {
            if (s === '')
                return;
            var j = s.split(':');
            headers[j[0]] = $.trim(j[1]);
        });
        return headers;
    }

});

window._poc.models.PlaceHolder = Backbone.Model.extend({
    getAction: function (name) {
        var actions = this.get('actions'),
            match;
        if (actions) {
            _.forEach(actions, function (action) {
                if (name === action.name) match = action;
            });
        }
        return match;
    }
});
window._poc.models.PlaceHolderCollection = Backbone.Collection.extend({
    model: window._poc.models.PlaceHolder
});
