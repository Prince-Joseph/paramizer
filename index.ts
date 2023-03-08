var currentUrl = new URL(String(window.location));
var URLParams = currentUrl.searchParams;
var url = window.location.protocol;

var search = document.getElementById('search') as HTMLInputElement;
var searchButton = document.getElementById('search-button') as HTMLElement;

var categories = document.querySelectorAll('[data-params="categories"]') as NodeListOf<HTMLDataElement>;

var filterButton = document.querySelector('[data-params="filter"]') as HTMLDataElement;
var filterLow = document.querySelector('#filter-low') as HTMLInputElement;
var filterHigh = document.querySelector('#filter-high') as HTMLInputElement;


var sorters = document.querySelectorAll('[data-params="sort"]') as NodeListOf<HTMLDataElement>;


var states = {
  "search": URLParams.get("search") ?? "",
  "categories": URLParams.get("categories") ?? "",
  "filter": URLParams.get("filter") ?? "",
  "filter-low": URLParams.get("filter-low") ?? "",
  "filter-high": URLParams.get("filter-high") ?? "",
  "sort": URLParams.get("sort") ?? "",
}
console.log(states);


let categoryArray: Number[] = [];


// @ts-ignore
for (const sorter of sorters) {

  sorter.style.cursor = "pointer";
  sorter.style.textDecoration = "underline";

  sorter.addEventListener('click', () => {
    let params = sorter.dataset.params as string ?? "";
    let paramsValue = sorter.dataset.sortValue as string ?? "";
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

    updateCategoryArray(paramsValue);
    manipulateUrl();
  })

}

var updateCategoryArray = (paramsValue: string) => {
  let categoryValue = parseInt(paramsValue) as number;
  let urlCategories = states["categories"];

  if (urlCategories === null || urlCategories === '') {
    categoryArray = [];
  }
  else {
    let stringCategoryArray: string[] = urlCategories.toString().split(",");
    console.log(urlCategories);
    stringCategoryArray = stringCategoryArray.filter((item: string, index) => stringCategoryArray.indexOf(item) === index);
    categoryArray = stringCategoryArray.map(Number) as Number[];
  }

  // only unique
  categoryArray = categoryArray.filter((value, index, array) => array.indexOf(value) === index);

  // add or remove items
  categoryArray.indexOf(categoryValue) === -1 ? categoryArray.push(categoryValue) : categoryArray.splice(categoryArray.indexOf(categoryValue), 1);

  let urlCategoryString = categoryArray.toString()
  updateParams("categories", urlCategoryString);
}

if (search) {

  function setSearchParams() {
    let params = "search" as string ?? "";
    let paramsValue = search.value as string ?? "";
    updateParams(params, paramsValue);
    manipulateUrl();
  }

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      setSearchParams()
    })
  }

  if (search) {
    if (states["search"]) {
      search.value = states["search"];
    }
    search.addEventListener('keypress', (event) => {
      if (event.key === "Enter") {
        // event.preventDefault();
        setSearchParams();
      }
    })
  }

}


if (filterButton) {

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

  filterButton.addEventListener('click', () => {
    let params = filterButton.dataset.params as string ?? "";
    let paramsValue = filterButton.dataset.filterValue as string ?? "";

    updateParams("filter-low", filterLow.value);
    updateParams("filter-high", filterHigh.value);
    updateParams(params, paramsValue);
    manipulateUrl();
  })
}

var updateParams = (params: string, paramsValue: any) => {
  switch (params) {
    case "sort":
      states["sort"] = paramsValue
      break;
    case "categories":
      states["categories"] = paramsValue
      break;
    case "search":
      states["search"] = paramsValue
      break;
    case "filter":
      states["filter"] = paramsValue
      break;
    case "filter-low":
      states["filter-low"] = paramsValue
      break;
    case "filter-high":
      states["filter-high"] = paramsValue
      break;
    default:
    // code block
  }
  console.log(states)
}

var manipulateUrl = () => {

  var stringURL =
    "?" + "search" + "=" + states["search"] +
    "&" + "categories" + "=" + states["categories"] +
    "&" + "filter" + "=" + states["filter"] +
    "&" + "filter-low" + "=" + states["filter-low"] +
    "&" + "filter-high" + "=" + states["filter-high"] +
    "&" + "sort" + "=" + states["sort"];

  location.href = url + stringURL;
}

