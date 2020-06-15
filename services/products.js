const {Products, Harvests} = require('../models');

class ProductsService {
	constructor() {

	}

	//GET SEARCH
    getProductSearch({ search, page, limit }) {
		return Products.find({$text: {$search: search}})
		.populate("harvest")
		.populate("category")
		.skip((page-1) * limit)
		.limit(limit);
	}

	//GET BY ID
	getProduct({ productId }) {
		return Products.findById(productId)
		.populate("harvest")
		.populate("category");
	}

	//POST
	async createProducts({ product }) {
		const newProduct = await Products.create(product);
		const updateHarvest = await Harvests.findById(product.harvest);
		updateHarvest.products.push(newProduct._id);
		await updateHarvest.save();
		return newProduct;
	}

	//PUT
	updateProducts({ productId, product }) {
		return Products.findByIdAndUpdate(productId, product);
	}

	//DELETE
	async deleteProducts({ productId }) {
		const vari = await Harvests.findOne({products: productId});
		vari.products =  vari.products.filter(val => !val === productId);
		await vari.save();
		return await Products.findByIdAndDelete(productId);
	}

	/* HARDCODE
	async createProduct(){
		const category = await Categories.create({
			name: "Frutos Secos",
		});
		const owner = await Users.create({
			name: "Juan Nuez",
			email: "Siembra@gmail.com",
		});
		owner.setPassword("Siembra123"); //colocar passwd
		await owner.save();
		const harvest = await Harvests.create({
			name: "Nuts",
			description: "Nueces y Cacahuates S.A.",
			owner: owner._id,
		});
		await Products.create({
			name: "Kale Baked",
			description: "Nueces, Maní y Almendras Saladas x 1kl",
			harvest: harvest._id,
			price: "58300",
			category: category._id,
			photo: "https://comefruta.es/wp-content/uploads/2014/05/frutos-secos-variados.jpg"
		});
	}*/
}

module.exports = ProductsService;