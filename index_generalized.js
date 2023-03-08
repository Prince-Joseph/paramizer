var currentUrl = new URL(String(window.location));
var URLParams = currentUrl.searchParams;
var url = window.location.protocol;
var manipulators = {};
var queryParams = ["sort", "price", "quantity"];
for (var queryParam in queryParams) {
    manipulators[queryParam] = [];
}
var sortState = URLParams.get("sort");
var sorters = document.querySelectorAll('[data-params="sort"]');
var _loop_1 = function (sorter) {
    sorter.style.cursor = "pointer";
    sorter.style.textDecoration = "underline";
    sorter.addEventListener('click', function () {
        var _a, _b;
        var params = (_a = sorter.dataset.params) !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = sorter.dataset.sortValue) !== null && _b !== void 0 ? _b : "";
        toggleURLParams(params, paramsValue);
    });
};
for (var _i = 0, sorters_1 = sorters; _i < sorters_1.length; _i++) {
    var sorter = sorters_1[_i];
    _loop_1(sorter);
}
var toggleURLParams = function (params, paramsValue) {
    var currentParams = URLParams.get(params);
    if (currentParams !== paramsValue) {
        location.href = url + "?" + params + "=" + paramsValue;
    }
    else {
        location.href = url + "?";
    }
};
var manipulateUrl = function () {
};
