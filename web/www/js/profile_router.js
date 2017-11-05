App.prototype.router = function(query) {
	
	if (query.email) {
		this.email = query.email;
		document.querySelector("#prihlasenInfo").innerText = this.email;
	}
	if (query.profile) {
		this.profile = query.profile;
		this.profileData = GET("/db/"+this.profile);
	}
	
	var p;
	var validPages = ["profile","prehledy","about"];
	if (validPages.indexOf(query.page) == -1) {
		p = "profile";
	} else {
		p = query.page;
	}
	this.loadPage(p).then(this["control_"+p].bind(this));
};

App.prototype.control_home = function(ctx) {
	
};

App.prototype.control_about = function(ctx) {

};


App.prototype.control_profile = function(ctx) {
	this.profileData.then(function(x){
		this.loadPage("profile_info", x);
	}.bind(this), function(x) {
		this.loadPage("register1").then(this.regPage1.call(this));
	}.bind(this));
};


App.prototype.regPage1 = function() {
	this.content.querySelector("#startRegister").addEventListener("click", 
			function() {
		this.loadPage("register2").then(this.regPage2.call(this));
		
	}.bind(this));
};

App.prototype.regPage2 = function() {
	
};