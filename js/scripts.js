var v=response.map(p=>p.title)
var page=1
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
     for(var i=0;i<10;i++){
			xid.children[i].childNodes[3].childNodes[0].nodeValue=getMt.result[i].title
			xid.children[i].childNodes[3].setAttribute("href",getMt.result[i].url)
			xid.children[i].setAttribute("title",getMt.result[i].author)
			
			xid.children[i].childNodes[3].childNodes[1].childNodes[1].innerText=getMt.result[i].num_points
			xid.children[i].childNodes[3].childNodes[1].childNodes[3].innerText=getMt.result[i].num_comments
			xid.children[i].childNodes[3].childNodes[1].childNodes[5].innerText=getMt.result[i].author
	 }
   }/*
   getMt.onerror = function(event) {
     alert("Name for SSN 444-44-4444 is " + getMt.result);
   }*/
;}
next.onclick=(event)=>console.log(event)
previous.onclick=(event)=>console.log(event)
first.onclick=(event)=>console.log(event)
last.onclick=(event)=>console.log(event)