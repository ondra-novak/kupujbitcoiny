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
	

	
	this.navAnim = "top";
};


App.prototype.loadPage = function(page, data, anim) {
	
	if (this.pageCache[page]) {
		return new Promise(function(ok,cancel) {
			var p = this.pageCache[page];
			if (data) p = Mustache.render(p,data);
			if (typeof anim == "undefined" && this.navAnim) {
				anim = this.navAnim;
				this.navAnim = "top";
			}
			if (anim) {
				var a = anim;
				var b = anim=="left"?"right":anim=="right"?"left":anim=="top"?"bottom":anim=="bottom"?"top":anim;
				var pe = this.content.parentElement;
				this.content.classList.add(a);				
				setTimeout(function(z){
					z.parentElement.removeChild(z);
				}.bind(this,this.content),250);
				this.content = document.createElement("div");
				this.content.setAttribute("id","content");
				this.content.classList.add("anim");
				this.content.classList.add("content");
				this.content.classList.add(b);
				pe.appendChild(this.content);
				setTimeout(function(z,b){
					z.classList.remove(b);
				}.bind(this,this.content,b),100);
			}
			this.content.innerHTML = p;
			setTimeout(ok.bind(this,this.content),1);
		}.bind(this));		
	} else {
		return GET("templates/"+page+".html").then(function(txt) {
			this.pageCache[page] = txt;
			return this.loadPage(page, data);
		}.bind(this));
	}
};

App.prototype.navigate = function(hashtext, navAnim) {
	location.hash = hashtext;
	this.navAnim = navAnim;
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