var currentUrl = new URL(String(window.location));
var URLParams = currentUrl.searchParams;
var url = window.location.protocol;

var states = {
  "sort": URLParams.get("sort") ?? "",
  "filter": URLParams.get("filter") ?? "",
  "filter-low": URLParams.get("filter-low") ?? "",
  "filter-high": URLParams.get("filter-high") ?? ""
}

var sorters = document.querySelectorAll('[data-params="sort"]') as NodeListOf<HTMLDataElement>;

for (const sorter of sorters) {

  sorter.style.cursor = "pointer";
  sorter.style.textDecoration = "underline";

  sorter.addEventListener('click', () => {
    let params = sorter.dataset.params as string ?? "";
    let paramsValue = sorter.dataset.sortValue as string ?? "";
    // toggleURLParams(params, paramsValue);
    updateParams(params, paramsValue);
    manipulateUrl();
  })

}

var toggleURLParams = (params: string, paramsValue: string) => {
  let currentParams = URLParams.get(params);
  if (currentParams !== paramsValue) {
    location.href = url + "?" + params + "=" + paramsValue;
  }
  else {
    location.href = url + "?";
  }
}

var updateParams = (params: string, paramsValue: string) => {

  (params === "search") ? states["search"] = paramsValue : states["search"] = "";
  (params === "filter") ? states["filter"] = paramsValue : states["filter"] = "";
  (params === "filter-low") ? states["filter-low"] = paramsValue : states["filter-low"] = "";
  (params === "filter-high") ? states["filter-high"] = paramsValue : states["filter-high"] = "";
  (params === "sort") ? states["sort"] = paramsValue : states["sort"] = "";

}

var manipulateUrl = () => {

  var stringURL =
    "?" + "search" + "=" + states["search"] +
    "&" + "filter" + "=" + states["filter"] +
    "&" + "filter-low" + "=" + states["filter-low"] +
    "&" + "filter-high" + "=" + states["filter-high"] +
    "&" + "sort" + "=" + states["sort"];

  location.href = url + stringURL;
}

