var v=response.map(p=>p.title)
var page=1
var pageSize=10
var firstUse=true
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
var request = window.indexedDB.open("dBName",2);
var fetchedRes;
request.onupgradeneeded = function(event) {
  var db = request.result;

  var objectStore = db.createObjectStore("news_articles", { keyPath: "id" });
  objectStore.createIndex("title", "email", { unique: false });
  objectStore.createIndex("url", "email", { unique: false });
  // objectStore.createIndex("num_points", "email", { unique: false });
  // objectStore.createIndex("num_comments", "email", { unique: false });
  objectStore.createIndex("author", "email", { unique: false });
  objectStore.createIndex("created_at", "email", { unique: false });
  objectStore.transaction.oncomplete = function(event) {
    
    var customerObjectStore = db.transaction("news_articles", "readwrite").objectStore("news_articles");
    for (var i in response) {
      customerObjectStore.add(response[i]);
    }
  };
};

request.onsuccess=function(event){
   var transaction = request.result.transaction("news_articles");
   var objectStore = transaction.objectStore("news_articles","readonly");
   var getMt = objectStore.getAll();
   getMt.onsuccess = function(event) {
     showPage()
   }/*
   getMt.onerror = function(event) {
     alert("Name for SSN 444-44-4444 is " + getMt.result);
   }*/

   showPage=()=>{
   	  console.log(page,document.getElementById(page))
		if(firstUse)
		 {
		 	for(var h=0;h<pageSize-1;h++)
			  {
			  	var el=xid.children[0].cloneNode(true)
			  	xid.appendChild(el)
			  }
			firstUse=false
		 }

   	  pageDets.innerText="Page "+page+" |Showing " +((page-1)*pageSize+1) + ' to ' + Math.min(page*pageSize,response.length) + ' of '+response.length+' results'
      for(var i=(page-1)*pageSize,j=0;i<page*pageSize,j<pageSize;i++,j++){
      	if(getMt.result[i])
				{	
					xid.children[j].style.display='flex'
					//xid.children[j].childNodes[3].style.display="flex"
   					xid.children[j].childNodes[3].childNodes[0].nodeValue=getMt.result[i].title
   					xid.children[j].childNodes[3].setAttribute("href",getMt.result[i].url)
   					xid.children[j].setAttribute("title",getMt.result[i].author)
   					
   					xid.children[j].childNodes[3].childNodes[1].childNodes[1].innerText=getMt.result[i].num_points
   					xid.children[j].childNodes[3].childNodes[1].childNodes[3].innerText=getMt.result[i].num_comments
   					xid.children[j].childNodes[3].childNodes[1].childNodes[5].innerText=getMt.result[i].author
   					if(document.getElementById(j+1) && document.getElementById(j+1).className.indexOf('focus')!=-1)
			   	  	{
			   	  		document.getElementById(j+1).classList.remove("focus")
			   	  	}
			 	}
		else{
			xid.lastChild.style.display='none'
		}
   			 }
   	   if(document.getElementById(page) && document.getElementById(page).className.indexOf('focus')==-1)
   	  	{
   	  		document.getElementById(page).classList.add("focus")
   	  	}
   	}
	next.onclick=(event)=>{
		if(page!=Math.ceil(response.length/(pageSize)))
			{
			page=page+1;
			showPage();
			console.log(event.srcElement.id)
			}
		}
	previous.onclick=(event)=>{
		if(page>1)
			{
			page=page-1;
			showPage();
			console.log(event.srcElement.id)
			}
		}
	first.onclick=(event)=>{page=1;
		showPage();
		console.log(event.srcElement.id)}
	last.onclick=(event)=>{page=Math.ceil(response.length/(pageSize));
		showPage();
		console.log(event.srcElement.id)}
;}

changePageSize=()=>{
	
	page=1
	
	while (xid.childElementCount>1) {
		xid.removeChild(xid.lastChild);
	}
	for(var h=0;h<pageSize-1;h++)
   	  {
   	  	var el=xid.children[0].cloneNode(true)
   	  	xid.appendChild(el)
   	  }
   	
   	for(var i=0;i<10;i++)
   	{
   		if(i<Math.ceil(response.length/(pageSize)))
   		{
   			   	document.getElementById(''+(i+1)).style.display='inline-flex'
   		}
   		else 
   			document.getElementById(''+(i+1)).style.display='none'
   	}
	showPage()
}