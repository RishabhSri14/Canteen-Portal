const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const FoodSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	rating: {
		type: Number,
		// required: false,
		default: 0
	},
	foodtype: {
		type: String,
		// required: true,
		enum: ['Veg', 'NonVeg']
	},
	Vendor_id: {
		type: String,
	},
	addons:
		[
			{
				addon:
				{
					type: String,
					// required: false,
					default: "none"
				},
				Aprice:
				{
					type: Number,
					// required: false,
					default: 0
				}
			}
		],
	tags:
	{
		type: [String]
	}




});

module.exports = y = mongoose.model("Foods", FoodSchema);// used Table name (schema) name as 'Users'
