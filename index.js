var _a, _b, _c, _d, _e, _f, _g, _h;
var currentUrl = new URL(String(window.location));
var URLParams = currentUrl.searchParams;
var url = window.location.protocol;
var search = document.getElementById('search');
var searchButton = document.getElementById('search-button');
var categories = document.querySelectorAll('[data-params="categories"]');
var statusFilters = document.querySelectorAll('[data-params="status"]');
var filterButton = document.querySelector('[data-params="filter"]');
var filterLow = document.querySelector('#filter-low');
var filterHigh = document.querySelector('#filter-high');
var sorters = document.querySelectorAll('[data-params="sort"]');
var pagelinks = document.querySelectorAll('[data-params="page"]');
var paramsClearers = document.querySelectorAll('[data-clear]');
var states = {
    "search": (_a = URLParams.get("search")) !== null && _a !== void 0 ? _a : "",
    "categories": (_b = URLParams.get("categories")) !== null && _b !== void 0 ? _b : "",
    "status": (_c = URLParams.get("status")) !== null && _c !== void 0 ? _c : "",
    "filter": (_d = URLParams.get("filter")) !== null && _d !== void 0 ? _d : "",
    "filter-low": (_e = URLParams.get("filter-low")) !== null && _e !== void 0 ? _e : "",
    "filter-high": (_f = URLParams.get("filter-high")) !== null && _f !== void 0 ? _f : "",
    "sort": (_g = URLParams.get("sort")) !== null && _g !== void 0 ? _g : "",
    "page": (_h = URLParams.get("page")) !== null && _h !== void 0 ? _h : ""
};
var categoryArray = [];
/* -------------------- *\

  Search
   id="search"

  Search Button
   id="search-button"

\* -------------------- */
if (search) {
    function setSearchParams() {
        var _a, _b;
        var params = (_a = "search") !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = search.value) !== null && _b !== void 0 ? _b : "";
        updateParams(params, paramsValue);
        manipulateUrl();
    }
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            setSearchParams();
        });
    }
    if (search) {
        if (states["search"]) {
            search.value = states["search"];
        }
        search.addEventListener('keypress', function (event) {
            if (event.key === "Enter") {
                // event.preventDefault();
                setSearchParams();
            }
        });
    }
}
var _loop_1 = function (category) {
    category.style.cursor = "pointer";
    category.style.textDecoration = "underline";
    category.addEventListener('click', function () {
        var _a, _b;
        var params = (_a = category.dataset.params) !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = category.dataset.categoryId) !== null && _b !== void 0 ? _b : "";
        updateCategoryArray(paramsValue);
        manipulateUrl();
    });
};
/* -------------------- *\

  Individual Categories
   data-params = "categories"
   data-category-id = "1"

   Individual Categories
   data-params = "categories"
   data-category-id = "2"

   Individual Categories
   data-params = "categories"
   data-category-id = "3"

\* -------------------- */
// @ts-ignore
for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
    var category = categories_1[_i];
    _loop_1(category);
}
var updateCategoryArray = function (paramsValue) {
    var categoryValue = parseInt(paramsValue);
    var urlCategories = states["categories"];
    if (urlCategories === null || urlCategories === '') {
        categoryArray = [];
    }
    else {
        var stringCategoryArray_1 = urlCategories.toString().split(",");
        console.log(urlCategories);
        stringCategoryArray_1 = stringCategoryArray_1.filter(function (item, index) { return stringCategoryArray_1.indexOf(item) === index; });
        categoryArray = stringCategoryArray_1.map(Number);
    }
    // only unique
    categoryArray = categoryArray.filter(function (value, index, array) { return array.indexOf(value) === index; });
    // add or remove items
    categoryArray.indexOf(categoryValue) === -1 ? categoryArray.push(categoryValue) : categoryArray.splice(categoryArray.indexOf(categoryValue), 1);
    var urlCategoryString = categoryArray.toString();
    updateParams("categories", urlCategoryString);
};
var _loop_2 = function (statusFilter) {
    statusFilter.style.cursor = "pointer";
    statusFilter.style.textDecoration = "underline";
    statusFilter.addEventListener('click', function () {
        var _a, _b;
        var params = (_a = statusFilter.dataset.params) !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = statusFilter.dataset.statusValue) !== null && _b !== void 0 ? _b : "";
        updateParams(params, paramsValue);
        manipulateUrl();
    });
};
/* -------------------- *\

  Status Filters
   data-params = "status"
   data-status-value = "packed"

\* -------------------- */
// @ts-ignore
for (var _j = 0, statusFilters_1 = statusFilters; _j < statusFilters_1.length; _j++) {
    var statusFilter = statusFilters_1[_j];
    _loop_2(statusFilter);
}
/* -------------------- *\

  Filter Buttons
   data-params = "filter"
   data-filter-value = "price"

  FilterLow Input
  id="filter-low"

  FilterHigh Input
  id="filter-high"

\* -------------------- */
if (filterButton) {
    if (states["filter"] !== "") {
        if (filterLow) {
            if (states["filter-low"]) {
                filterLow.value = states["filter-low"];
            }
        }
        if (filterHigh) {
            if (states["filter-high"]) {
                filterHigh.value = states["filter-high"];
            }
        }
    }
    filterButton.addEventListener('click', function () {
        var _a, _b;
        var params = (_a = filterButton.dataset.params) !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = filterButton.dataset.filterValue) !== null && _b !== void 0 ? _b : "";
        updateParams("filter-low", filterLow.value);
        updateParams("filter-high", filterHigh.value);
        updateParams(params, paramsValue);
        manipulateUrl();
    });
}
var _loop_3 = function (sorter) {
    sorter.style.cursor = "pointer";
    sorter.style.textDecoration = "underline";
    sorter.addEventListener('click', function () {
        var _a, _b;
        var params = (_a = sorter.dataset.params) !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = sorter.dataset.sortValue) !== null && _b !== void 0 ? _b : "";
        updateParams(params, paramsValue);
        manipulateUrl();
    });
};
/* -------------------- *\
  Sort Lists
  data-params="sort"  data-sort-value="gh"
\* -------------------- */
// @ts-ignore
for (var _k = 0, sorters_1 = sorters; _k < sorters_1.length; _k++) {
    var sorter = sorters_1[_k];
    _loop_3(sorter);
}
var _loop_4 = function (pagelink) {
    pagelink.style.cursor = "pointer";
    pagelink.style.textDecoration = "underline";
    pagelink.addEventListener('click', function () {
        var _a, _b;
        var params = (_a = pagelink.dataset.params) !== null && _a !== void 0 ? _a : "";
        var paramsValue = (_b = pagelink.dataset.pageNumber) !== null && _b !== void 0 ? _b : "";
        updateParams(params, paramsValue);
        manipulateUrl();
    });
};
/* -------------------- *\
  Pagination
  data-params="page"  data-page-number="69"
  data-params="page"  data-page-number="{{ current_page_number }}"
  data-params="page"  data-page-number="{{ qs.next_page_number }}"
\* -------------------- */
// @ts-ignore
for (var _l = 0, pagelinks_1 = pagelinks; _l < pagelinks_1.length; _l++) {
    var pagelink = pagelinks_1[_l];
    _loop_4(pagelink);
}
var _loop_5 = function (clearBtn) {
    clearBtn.addEventListener('click', function () {
        var _a;
        var params = (_a = clearBtn.dataset.clear) !== null && _a !== void 0 ? _a : "";
        var paramsValue = "";
        updateParams(params, paramsValue);
        manipulateUrl();
    });
};
/* -------------------- *\
  Creating Clear Buttons
\* -------------------- */
//@ts-ignore
for (var _m = 0, paramsClearers_1 = paramsClearers; _m < paramsClearers_1.length; _m++) {
    var clearBtn = paramsClearers_1[_m];
    _loop_5(clearBtn);
}
/* -------------------- *\
  Update State
\* -------------------- */
var updateParams = function (params, paramsValue) {
    switch (params) {
        case "search":
            states["search"] = paramsValue;
            break;
        case "filter-low":
            states["filter-low"] = paramsValue;
            break;
        case "filter-high":
            states["filter-high"] = paramsValue;
            break;
        case "page":
            states["page"] = paramsValue;
            break;
        default:
            if (states[params] !== paramsValue) {
                switch (params) {
                    case "sort":
                        states["sort"] = paramsValue;
                        break;
                    case "categories":
                        states["categories"] = paramsValue;
                        break;
                    case "status":
                        states["status"] = paramsValue;
                        break;
                    case "filter":
                        states["filter"] = paramsValue;
                        break;
                    default:
                        break;
                }
            }
            else {
                updateParams(params, "");
            }
    }
    // console.log(states)
};
/* -------------------- *\
  redirection function
\* -------------------- */
var manipulateUrl = function () {
    var stringURL = "?" + "search" + "=" + states["search"] +
        "&" + "categories" + "=" + states["categories"] +
        "&" + "status" + "=" + states["status"] +
        "&" + "filter" + "=" + states["filter"] +
        "&" + "filter-low" + "=" + states["filter-low"] +
        "&" + "filter-high" + "=" + states["filter-high"] +
        "&" + "sort" + "=" + states["sort"] +
        "&" + "page" + "=" + states["page"];
    location.href = url + stringURL;
};
