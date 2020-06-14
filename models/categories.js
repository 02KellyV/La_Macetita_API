const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
        required: true,
        //remove trailing whitespace
        trim: true,
        //at least 3 characters long
        minLength: 3,
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);