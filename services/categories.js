const {Categories} = require('../models');

class CategoriesService {
	constructor() {

	}

	//GET
	getCategories() {
		return Categories.find();
	}

	//GET BY ID
	getCategory({ categoryId }) {
		return Categories.findById(categoryId);		
	}

	//POST
	createCategories({ category }) {
		return Categories.create(category);
	}

	//PUT
	updateCategory({ categoryId, category }) {
		return Categories.findByIdAndUpdate(categoryId, category);
	}

	//DELETE
	deleteCategory({ categoryId }) {
		return Categories.findByIdAndDelete(categoryId);
	}
}

module.exports = CategoriesService;