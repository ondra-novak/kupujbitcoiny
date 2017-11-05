function(doc, req) {
	
	

	var data = JSON.parse(req.body);
	
	if (!data.email) {
		return [null, {code:400,body:"email is mandatory"}];
	}
	if (!data.template) {
		return [null, {code:400,body:"template is mandatory"}];
	}
	
	data._id = req.uuid;
	data.class = "email";
	
	return [data, ""];
}