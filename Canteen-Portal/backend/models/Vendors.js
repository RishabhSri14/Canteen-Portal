const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	Mname: {
		type: String,
		required: true
	},
	shop:{
		type: String,
		required: true
	},
	phone:{
		type: String,
		required: true
	},
    otime:{
		type: String,
		required: true
	},
    ctime:{
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	pass:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
});

module.exports = x = mongoose.model("Vendors", VendorSchema);
