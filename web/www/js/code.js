"use strict";


function parseHash() {
	
	var hashdata = location.hash;
	if (hashdata == "") return {};
	var data = hashdata.substr(1);
	var items = data.split("&");
	var res= {};
	items.forEach(function(x) {
		var eq = x.indexOf("=");
		var key = x.substr(0,eq);
		var val = x.substr(eq+1);
		res[decodeURIComponent(key)] = decodeURIComponent(val);
	});
	
	return res;
	
};

function App(content) {
	
	this.content = content;

	window.addEventListener("hashchange", function(){
		this.router(parseHash());
	}.bind(this));
	
	this.router(parseHash());
	this.pageCache = {};
	

	
};

App.prototype.router = function(query) {
	
	this.content.innerHTML = JSON.stringify(query," ");
	
};

App.prototype.loadPage = function(page, entryPoint, data) {
	
	if (this.pageCache[page]) {
		var page = this.pageCache[page];
		if (data) page = Mustache.render(page,data);
		this.content.innerHTML = page;
		entryPoint(this.content, data);
	}
	
	var ldr = new XMLHttpRequest;
	ldr.open("GET","templates/"+page+".html");
	ldr.onreadystatechange =function() {
		 if(ldr.readyState === XMLHttpRequest.DONE && ldr.status === 200) {
			 this.pageCache[page] = ldr.responseText;
			 this.loadPage(page,entryPoint,data);
		 }
	}.bind(this);
	ldr.send();
}


function start() {

	window.theApp = new App(document.getElementById("content"));
	
};