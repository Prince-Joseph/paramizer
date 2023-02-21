var currentUrl = new URL(String(window.location));
var URLParams = currentUrl.searchParams;
var url = window.location.protocol;

var manipulators = {};
var queryParams = ["sort", "price", "quantity"]
for (const queryParam in queryParams ){
    manipulators[queryParam] = []
}

var sortState = URLParams.get("sort");
var sorters = document.querySelectorAll('[data-params="sort"]') as NodeListOf <HTMLDataElement>;

for (const sorter of sorters){

   sorter.style.cursor = "pointer";
   sorter.style.textDecoration = "underline";

   sorter.addEventListener('click', ()=>{
        let params = sorter.dataset.params as string ?? "" ;
        let paramsValue = sorter.dataset.sortValue as string ?? "" ;
        toggleURLParams(params,paramsValue);

   })
}

var toggleURLParams = (params:string, paramsValue:string) =>{
    let currentParams = URLParams.get(params);
    if (currentParams !== paramsValue){
        location.href =url+ "?" + params + "=" + paramsValue;
    }
    else{
        location.href = url +"?";
    }

}

var manipulateUrl = () =>{

}

