const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const OrderSchema = new Schema({
	time: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	User_id: {
		type: String,
	},
	Vendor_id: {
		type: String,
	},
    Food_id: {
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
    status:
    {
        type: String,
        enum: ["PLACED", "ACCEPTED","COOKING","READY FOR PICKUP", "COMPLETED", "REJECTED"],
        default:"PLACED"
    }
});

module.exports = x = mongoose.model("Orders", OrderSchema);// used Table name (schema) name as 'Users'
