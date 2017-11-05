function(doc, httpreq){
	
	
	var getProfileID = require('views/lib/profileid').getProfileID;
	var Validator = require('views/lib/validateFields').FieldValidator;
	var req = JSON.parse(httpreq.body);
	var errors = null;
	var nochange = false;

	page = req.page;	
		
	if (doc == null) {
		
		if (page == "register") {
			
			email = req.email;
			docid = getProfileID(email);
			if (docid != httpreq.id) {
				return [null, {code:403,json:{"error":"UserID doesn't match"}}];
			}
			doc = {
					_id: httpreq.id,
					class:"profile",
					email: email,
					stat_id: httpreq.uuid,
					chkcode: Math.round(Math.random()*1000000)
			};
			
		} else {
			return [null, {code:403,body:"Need register"}];
		}		
	} else {
		
		if (page == "identity") {
			
			var v = new Validator;
			
			doc[page] = {};
			var pdata = doc[page];
			
			pdata.jmeno=v.string(req,"jmeno");
			pdata.prijmeni=v.string(req,"prijmeni");
			pdata.rc=v.rcnumber(req,"rc");
			pdata.op=v.string(req,"op");
			pdata.adresa=v.string(req,"adresa");
			pdata.obec=v.string(req,"obec");
			pdata.psc = v.pscnumber(req,"psc");
			pdata.telefon = v.phonenumber(req,"telefon");
			pdata.politik = v.mandatory(req,"politik");
			if (v.hasErrors()) errors = v.errors;
		}  else {
			nochange = true;
		}
		
	}
	
	var missing =[];
	if (!("identity" in doc)) missing.push("identity");
	var attachments;
	if ("_attachments" in doc) attachments = doc._attachments; else attachments={};
	if (!("op_front" in attachments)) missing.push("op_front");
	if (!("op_back" in attachments)) missing.push("op_back");
	if (!("doklad2" in attachments)) missing.push("op_back");
	if (!("selfie" in attachments)) missing.push("selfie");
	if (!("crypto" in doc)) missing.push("crypto");
	
	out = {
			missing:missing,
			errors:errors,
			page:page	
	};
	
	if (errors != null) nochange = true;
	
	if (nochange) {
		return [null, {json:out, code:200}];
	} else {	
		return [doc, {json:out, code:202}];
	}	
}