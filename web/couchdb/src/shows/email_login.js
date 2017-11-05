function (doc, req) {
 
		
	//!json templates.email_text
	
	var getProfileID = require('views/lib/profileid').getProfileID;
	var Mustache = require('views/lib/mustache');

	

	var view = {
			  email_url: encodeURIComponent(doc.email),
			  email:  doc.email,
			  profile: getProfileID(doc.email),			 
			};

//	var output="xxx";
	var output = Mustache.render(templates.email_text, view);
	
	return {"headers":{"Content-Type":"text/plain;charset=utf-8"},"body":output};
	
	
}