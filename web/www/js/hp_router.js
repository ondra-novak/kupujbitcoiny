App.prototype.router = function(query) {
	
	var p;
	var validPages = ["home","about","login"];
	if (validPages.indexOf(query.page) == -1) {
		p = "home";
	} else {
		p = query.page;
	}
	this.loadPage(p).then(this["control_"+p].bind(this));
};

App.prototype.control_home = function(ctx) {
	
	
};

App.prototype.control_about = function(ctx) {
	
	
};

App.prototype.control_login = function(ctx) {
	this.hideErrors(this.content);
	var but = document.querySelector("#regbutton");
	but.addEventListener("click", this.doReg.bind(this));	
};

App.prototype.doReg = function() {
	this.hideErrors(this.content);
	var emlp = document.querySelector("#regemail");
	var email = emlp.value;
	
	if (email == "") {
		this.showErrors(this.content,"errEmpty");
	} else {	
		var valeml = /^[A-Z0-9._%+-]+@([A-Z0-9_-]+[.])+[A-Z]+$/igm;
		if (!valeml.test(email)) {
			this.showErrors(this.content,"errInv");
		} else {		
			req = {
					template:"email_login",
					email:email
			};
			var but = document.querySelector("#regbutton");
			but.disabled=true;
			POST("/db/update/sendmail",JSON.stringify(req))
				.then(this.loadPage.bind(this,"login_email_sent",req)
					 ,this.loadPage.bind(this,"error"));
		}
	}
	
};
