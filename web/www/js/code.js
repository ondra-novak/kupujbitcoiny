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
	
	this.pageCache = {};
	

	
};


App.prototype.loadPage = function(page, data) {
	
	if (this.pageCache[page]) {
		return new Promise(function(ok,cancel) {
			var p = this.pageCache[page];
			if (data) p = Mustache.render(p,data);
			this.content.innerHTML = p;
			ok(this.content);
		}.bind(this));		
	} else {
		return GET("templates/"+page+".html").then(function(txt) {
			this.pageCache[page] = txt;
			return this.loadPage(page, data);
		}.bind(this));
	}
};

App.prototype.showErrors=function(element, errClass) {
	var elm = element.getElementsByClassName(errClass);
	var l = elm.length;
	var i;
	for (i = 0; i < l; i++) {
		elm[i].hidden = false;
	}
};

App.prototype.hideErrors=function(element) {
	var elm = element.getElementsByClassName("error");
	var l = elm.length;
	var i;
	for (i = 0; i < l; i++) {
		elm[i].hidden = true;
	}
};


function start() {

	window.theApp = new App(document.getElementById("content"));
	window.theApp.router(parseHash());
};