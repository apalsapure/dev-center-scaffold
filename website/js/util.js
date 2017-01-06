hljs.initHighlightingOnLoad();
Breakpoints();

$(document).ready(function () {
    (function (global) {
        global.utils.parseQuery = function () {
            var queryString = {};
            location.search.substr(1).split("&").forEach(function (pair) {
                if (pair === "") return;
                var parts = pair.split("=");
                queryString[parts[0]] = parts[1] &&
                    decodeURIComponent(parts[1].replace(/\+/g, " "));
            });
            return queryString;
        };
    })(window._poc);

    // Table formatting
    $('#divContent table').each(function (i, ele) {
        var $ele = $(ele);
        $ele.addClass('table table-bordered table-hover');
        $('<thead></thead>').prependTo($ele).append($('tr:first', $ele));
    });

    window.Site.run();

    $('.breadcrumb').asBreadcrumbs();
});

$.fn.extend({
    disableInput: function () {
        $(this).keydown(function (e) {
            if ((e.which === 32) || (e.which > 45 && e.which < 91) || (e.which > 95 && e.which < 112) || (e.which > 185 && e.which < 223)) {
                e.preventDefault();
                return false;
            }
        });
        return this;
    }
});