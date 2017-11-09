App.prototype.router = function(query) {
	
	if (query.email) {
		this.email = query.email;
		document.querySelector("#prihlasenInfo").innerText = this.email;
	}
	if (query.profile && (!this.profile || this.profile != query.profile)) {
		
		this.profile = query.profile;
		this.profileData = GET("/db/"+this.profile).then(JSON.parse)
		.then(function(x) {
			document.querySelector("#prihlasenInfo").innerText = x.email;
			return x;
		});
	}
	
	var p;
	var validPages = ["profile","prehledy","about","error","amlform1","amlform2","amlform3"];
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
		this.loadPage("register1").then(this.regPage1.bind(this));
	}.bind(this));
};


App.prototype.regPage1 = function(c) {
	this.content.querySelector("#startRegister").addEventListener("click", 
			function() {
		this.loadPage("register2",null,"left").then(this.regPage2.bind(this));
		
	}.bind(this));
};

App.prototype.loadAmlForm = function(name) {
	return this.profileData.then(function(x){
		
		return this.loadPage(name, x,null).then(function(){
			return this.content.querySelector(".amlform1").hidden=false;
		}.bind(this),function() {
			throw this.loadPage("error");			
		}.bind(this));
		
	}.bind(this), function(x) {
		throw this.loadPage("error");
	}.bind(this));
	
};

App.prototype.updateProfile = function(data) {
	this.profileData.then(function(curdata) {
		var k1 = JSON.stringify(curdata);
		for (var k in data) {
			curdata[k] = data[k];		
		}
		var k2 = JSON.stringify(curdata);
		if (k1 == k2) return;
		this.profileData = PUT("/db/"+this.profile, curdata)
			.then(function(a) {
				res = JSON.parse(a);
				curdata._rev = res.rev;
				return curdata;
			}.bind(this));
	}.bind(this));

};

App.prototype.control_amlform1 = function(ctx) {
	
	function updateProfile() {
		this.updateProfile(
				{"jmeno":this.content.querySelector("#fjmeno").value,
				 "prijmeni":this.content.querySelector("#fprijmeni").value,
				 "rc":this.content.querySelector("#frc").value,
				 "op":this.content.querySelector("#fop").value
				});		
	}
	
	this.loadAmlForm("amlform1").then(function(){
		this.content.querySelector("#bnext").addEventListener("click",function() {
			updateProfile.call(this);
			this.navigate("page=amlform2&profile="+this.profile,"left");
		}.bind(this));
	}.bind(this));	
};

App.prototype.control_amlform2 = function(ctx) {
	
	function updateProfile() {
		this.updateProfile(
				{"ulice":this.content.querySelector("#fulice").value,
				 "obec":this.content.querySelector("#fobec").value,
				 "kraj":this.content.querySelector("#fkraj").value,
				 "stat":this.content.querySelector("#fstat").value,
				 "psc":this.content.querySelector("#fpsc").value
				});		
	}
	
	this.loadAmlForm("amlform2").then(function(){
		this.content.querySelector("#bback").addEventListener("click",function() {
			updateProfile.call(this);
			this.navigate("page=amlform1&profile="+this.profile,"right");
		}.bind(this));
	}.bind(this));	
};

App.prototype.regPage2 = function() {
	var souhlasBox = this.content.querySelector("#souhlasbox");
	var okButt = this.content.querySelector("#startRegister");
	okButt.disabled = true;
	souhlasBox.addEventListener("click", function() {
		okButt.disabled = !souhlasBox.checked;
	});
	okButt.addEventListener("click",function(){
		
	
		PUT("db/update/profile/"+this.profile, {
			page:"register",
			email:this.email			
		}).then(function(){
			this.navigate("page=amlform1&profile="+this.profile,"left");
		}.bind(this),function() {
			this.navigate("#page=error","bottom");
		}.bind(this));		
	}.bind(this));
	
};