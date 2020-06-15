const {Products, Harvests} = require('../models');
const aws = require('aws-sdk'), // ^2.2.41
    multer = require('multer'), // "multer": "^1.1.0"
    multerS3 = require('multer-s3'); //"^1.4.1"

class ProductsService {
	constructor() {
		aws.config.update({
			secretAccessKey: 'o2+xmst5uck+Ky11CnxlRGhM9C+W5LL669kq0vhy',
			accessKeyId: 'AKIARWIFNV2UXFWOLEU2',
			region: 'us-east-2'
		});
		this.s3 = new aws.S3();
	}

	upload(){
		return multer({
			storage: multerS3({
				s3: this.s3,
				acl: "public-read",
				bucket: 'macetita-prodcts-imgs',
				key: function (req, file, cb) {
					cb(null, `${new Date().getTime()}.${file.originalname.split('.')[1]||file.mimetype.split("/")[1]}`); //use Date.now() for unique file keys
				}
			})
		});
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