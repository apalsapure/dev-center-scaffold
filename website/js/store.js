window.Store = new function () {
    this.set = function (key, value) {
        Cookies.set(key, value);
    };
    this.get = function (key) {
        var val = Cookies.get(key);
        if (val === 'undefined') return;
        return val;
    };
    this.clear = function (key) {
        Cookies.remove(key);
    };
}();