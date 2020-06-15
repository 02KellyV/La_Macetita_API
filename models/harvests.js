const mongoose = require('mongoose');
const harvestSchema = new mongoose.Schema({
	name: {
		type: String,
        required: true,
        //remove trailing whitespace
        trim: true,
        //at least 3 characters long
        minLength: 3,
	},
	description: {
		type: String
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
        ref:'User',
	},
	location: {
		type: String		
	},
	products: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	}],
}, {
	timestamps: true
});

module.exports = mongoose.model('Harvest', harvestSchema);