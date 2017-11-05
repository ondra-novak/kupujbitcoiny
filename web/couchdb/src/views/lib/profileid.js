function getProfileID(email) {
	
	var sha256 = require('views/lib/sha256').sha256;
	var base64 = require('views/lib/base64').base64;
	var salt = require('views/lib/salt').key;

	var hash = sha256.hmac.create(salt);
	hash.update(email);
	return "P"+base64(hash.array(),true).substr(0,43);
	
}

exports.getProfileID = getProfileID;

