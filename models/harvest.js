const mongoose = require('mongoose');
const harvestSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true;
	},
	description: {
		type: String
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
        ref:'User';
	},
	place: {
		type: String		
	},
	category: {
		type: String
	},
	products: {
		type: mongoose.Schema.Types.ObjectId,
        ref:'Products';
	}
}, {
	timestamps: true;
});

module.export = mongoose.model('', harvestSchema);