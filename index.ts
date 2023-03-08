var currentUrl = new URL(String(window.location));
var URLParams = currentUrl.searchParams;
var url = window.location.protocol;

var search = document.getElementById('search') as HTMLInputElement;
var searchButton = document.getElementById('search-button') as HTMLElement;

var categories = document.querySelectorAll('[data-params="categories"]') as NodeListOf<HTMLDataElement>;
var statusFilters = document.querySelectorAll('[data-params="status"]') as NodeListOf<HTMLDataElement>;

var filterButton = document.querySelector('[data-params="filter"]') as HTMLDataElement;
var filterLow = document.querySelector('#filter-low') as HTMLInputElement;
var filterHigh = document.querySelector('#filter-high') as HTMLInputElement;


var sorters = document.querySelectorAll('[data-params="sort"]') as NodeListOf<HTMLDataElement>;
var pagelinks = document.querySelectorAll('[data-params="page"]') as NodeListOf<HTMLDataElement>;
var paramsClearers = document.querySelectorAll('[data-clear]') as NodeListOf<HTMLDataElement>;


var states = {
  "search": URLParams.get("search") ?? "",
  "categories": URLParams.get("categories") ?? "",
  "status": URLParams.get("status") ?? "",
  "filter": URLParams.get("filter") ?? "",
  "filter-low": URLParams.get("filter-low") ?? "",
  "filter-high": URLParams.get("filter-high") ?? "",
  "sort": URLParams.get("sort") ?? "",
  "page": URLParams.get("page") ?? "",
}

let categoryArray: Number[] = [];

/* -------------------- *\

  Search
   id="search"

  Search Button
   id="search-button"

\* -------------------- */
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
for (const category of categories) {

  category.style.cursor = "pointer";
  category.style.textDecoration = "underline";

  category.addEventListener('click', () => {
    let params = category.dataset.params as string ?? "";
    let paramsValue = category.dataset.categoryId as string ?? "";

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

/* -------------------- *\

  Status Filters
   data-params = "status"
   data-status-value = "packed"

\* -------------------- */
// @ts-ignore
for (const statusFilter of statusFilters ) {

  statusFilter.style.cursor = "pointer";
  statusFilter.style.textDecoration = "underline";

  statusFilter.addEventListener('click', () => {
    let params = statusFilter.dataset.params as string ?? "";
    let paramsValue = statusFilter.dataset.statusValue as string ?? "";
   
    updateParams(params, paramsValue);
    manipulateUrl();
  })

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

  filterButton.addEventListener('click', () => {
    let params = filterButton.dataset.params as string ?? "";
    let paramsValue = filterButton.dataset.filterValue as string ?? "";

    updateParams("filter-low", filterLow.value);
    updateParams("filter-high", filterHigh.value);
    updateParams(params, paramsValue);
    manipulateUrl();
  })
}


/* -------------------- *\
  Sort Lists
  data-params="sort"  data-sort-value="gh"
\* -------------------- */
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

/* -------------------- *\
  Pagination
  data-params="page"  data-page-number="69"
  data-params="page"  data-page-number="{{ current_page_number }}"
  data-params="page"  data-page-number="{{ qs.next_page_number }}"
\* -------------------- */
// @ts-ignore
for (const pagelink of pagelinks) {

  pagelink.style.cursor = "pointer";
  pagelink.style.textDecoration = "underline";

  pagelink.addEventListener('click', () => {
    let params = pagelink.dataset.params as string ?? "";
    let paramsValue = pagelink.dataset.pageNumber as string ?? "";
    updateParams(params, paramsValue);
    manipulateUrl();
  })

}


/* -------------------- *\
  Creating Clear Buttons
\* -------------------- */
for (const clearBtn of paramsClearers) {
  clearBtn.addEventListener('click', () => {
    let params = clearBtn.dataset.clear ?? "";
    let paramsValue = "";
    updateParams(params, paramsValue);
    manipulateUrl();
  })
}



/* -------------------- *\
  Update State
\* -------------------- */
var updateParams = (params: string, paramsValue: any) => {
  if (states[params] !== paramsValue) {
    switch (params) {
      case "search":
        states["search"] = paramsValue
        break;
      case "categories":
        states["categories"] = paramsValue
        break;
      case "status":
        states["status"] = paramsValue
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
      case "sort":
        states["sort"] = paramsValue
        break;
      case "page":
        states["page"] = paramsValue
        break;
      default:
      // code block
    }
  }
  else {
    updateParams(params, "");
  }
  // console.log(states)
}



/* -------------------- *\
  redirection function
\* -------------------- */
var manipulateUrl = () => {

  var stringURL =
    "?" + "search" + "=" + states["search"] +
    "&" + "categories" + "=" + states["categories"] +
    "&" + "status" + "=" + states["status"] +
    "&" + "filter" + "=" + states["filter"] +
    "&" + "filter-low" + "=" + states["filter-low"] +
    "&" + "filter-high" + "=" + states["filter-high"] +
    "&" + "sort" + "=" + states["sort"] +
    "&" + "page" + "=" + states["page"];

  location.href = url + stringURL;
}

