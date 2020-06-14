const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
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
	harvest: {
		type: mongoose.Schema.Types.ObjectId,
        ref:'Harvest',
	},
	price: {
		type: String		
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
	},
	photo: String,
    start_season_at: Date,
	end_season_at: Date,
}, {
	timestamps: true
});

productSchema.index({name: 'text', description: 'text'})
module.exports = mongoose.model('Product', productSchema);