function(doc, req){
	var sha256 = require('views/lib/sha256').sha256;
	var base64 = require('views/lib/base64').base64;
	
	var hash = sha256.create();
	hash.update(req.body);
	var buffer = hash.array();
	var base = base64(buffer).substr(0,43);
	return [null,{body:base}];
}
