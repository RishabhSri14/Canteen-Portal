const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age:{
		type: String,
		required: true
	},
	batch:{
		type: String,
		required: true
	},
	phone:{
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
	wallet:{
		type: Number,
		required: false,
		default: 0
	}
	

});

module.exports = x = mongoose.model("Users", UserSchema);// used Table name (schema) name as 'Users'
