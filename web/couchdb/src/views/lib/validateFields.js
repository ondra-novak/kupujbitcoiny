FieldValidator = function() {
	
	this.errors = [];
	
};

FieldValidator.prototype.string = function(struct, field) {
	this.mandatory(struct,field);
	return struct[field];
};

FieldValidator.prototype.number = function(struct, field) {
	this.mandatory(struct,field);
	return struct[field];
};

FieldValidator.prototype.rcnumber = function(struct, field) {
	this.mandatory(struct,field);
	return struct[field];
};
FieldValidator.prototype.opnumber = function(struct, field) {
	this.mandatory(struct,field);
	return struct[field];
};
FieldValidator.prototype.pscnumber = function(struct, field) {
	this.mandatory(struct,field);
	return struct[field];
};
FieldValidator.prototype.phonenumber = function(struct, field) {
	this.mandatory(struct,field);
	return struct[field];
};
FieldValidator.prototype.hasErrors = function() {
	return this.errors.length != 0;
};
FieldValidator.prototype.addError = function(code, field, desc) {
	this.errors.push({code:code,field:field,message:desc});
};
FieldValidator.prototype.mandatory = function(struct,field) {
	if (!struct[field]) {
		this.addError(50, field, "Povinná položka");
	}
	return struct[field];
	
};

exports.FieldValidator = FieldValidator;

