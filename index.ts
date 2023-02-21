var currentUrl = new URL(String(window.location));
var URLParams = currentUrl.searchParams;
var url = window.location.protocol;

var states = {
  "sort": URLParams.get("sort") ?? "",
  "categories": URLParams.get("categories") ?? "",
  "filter": URLParams.get("filter") ?? "",
  "filter-low": URLParams.get("filter-low") ?? "",
  "filter-high": URLParams.get("filter-high") ?? ""
}

var sorters = document.querySelectorAll('[data-params="sort"]') as NodeListOf<HTMLDataElement>;
var categories = document.querySelectorAll('[data-params="categories"]') as NodeListOf<HTMLDataElement>;

// @ts-ignore
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

// @ts-ignore
for (const category of categories) {

  category.style.cursor = "pointer";
  category.style.textDecoration = "underline";

  category.addEventListener('click', () => {
    let params = category.dataset.params as string ?? "";
    let paramsValue = category.dataset.categoriesValue as string ?? "";
    // toggleURLParams(params, paramsValue);
    // updateParams(params, paramsValue);
    updateCategoryArray(paramsValue);
    // manipulateUrl();
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

var updateCategoryArray = (paramsValue:string) =>{
  let urlCategories = states["categories"];
  let categoryArray: Number[] = [];
  if (urlCategories === null || urlCategories === ''){
    categoryArray = [];
  }
  else{
    let stringCategoryArray: string[] = urlCategories.split(",");
    stringCategoryArray = stringCategoryArray.filter((item:string, index) => stringCategoryArray.indexOf(item) === index);
    categoryArray = stringCategoryArray.map(Number) as Number[];
  }

  categoryArray.push(parseInt(paramsValue))
  let index = categoryArray.indexOf(4)
  categoryArray.splice(index,1)

  console.log(categoryArray);

}

var updateParams = (params: string, paramsValue: string) => {

  (params === "search") ? states["search"] = paramsValue : states["search"] = "";
  (params === "categories") ? states["categories"] = paramsValue : states["categories"] = "";
  (params === "filter") ? states["filter"] = paramsValue : states["filter"] = "";
  (params === "filter-low") ? states["filter-low"] = paramsValue : states["filter-low"] = "";
  (params === "filter-high") ? states["filter-high"] = paramsValue : states["filter-high"] = "";
  (params === "sort") ? states["sort"] = paramsValue : states["sort"] = "";

}

var manipulateUrl = () => {

  var stringURL =
    // "?" + "search" + "=" + states["search"] +
    "?" + "categories" + "=" + states["categories"] +
    // "&" + "filter" + "=" + states["filter"] +
    // "&" + "filter-low" + "=" + states["filter-low"] +
    // "&" + "filter-high" + "=" + states["filter-high"] +
    "&" + "sort" + "=" + states["sort"];

  location.href = url + stringURL;
}

