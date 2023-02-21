var _a, _b, _c, _d;
var currentUrl = new URL(String(window.location));
var URLParams = currentUrl.searchParams;
var url = window.location.protocol;
var states = {
    "sort": (_a = URLParams.get("sort")) !== null && _a !== void 0 ? _a : "",
    "filter": (_b = URLParams.get("filter")) !== null && _b !== void 0 ? _b : "",
    "filter-low": (_c = URLParams.get("filter-low")) !== null && _c !== void 0 ? _c : "",
    "filter-high": (_d = URLParams.get("filter-high")) !== null && _d !== void 0 ? _d : ""
};
var sorters = document.querySelectorAll('[data-params="sort"]');
var _loop_1 = function (sorter) {
    sorter.style.cursor = "pointer";
    sorter.style.textDecoration = "underline";
    sorter.addEventListener('click', function () {
        var _a, _b;
        var params = (_a = sorter.dataset.params) !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = sorter.dataset.sortValue) !== null && _b !== void 0 ? _b : "";
        // toggleURLParams(params, paramsValue);
        updateParams(params, paramsValue);
        manipulateUrl();
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
var updateParams = function (params, paramsValue) {
    (params === "search") ? states["search"] = paramsValue : states["search"] = "";
    (params === "filter") ? states["filter"] = paramsValue : states["filter"] = "";
    (params === "filter-low") ? states["filter-low"] = paramsValue : states["filter-low"] = "";
    (params === "filter-high") ? states["filter-high"] = paramsValue : states["filter-high"] = "";
    (params === "sort") ? states["sort"] = paramsValue : states["sort"] = "";
};
var manipulateUrl = function () {
    var stringURL = "?" + "search" + "=" + states["search"] +
        "&" + "filter" + "=" + states["filter"] +
        "&" + "filter-low" + "=" + states["filter-low"] +
        "&" + "filter-high" + "=" + states["filter-high"] +
        "&" + "sort" + "=" + states["sort"];
    location.href = url + stringURL;
};
