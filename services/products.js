const { Products, Harvests, Users, Categories } = require("../models");

class ProductsService {
  constructor() {}
  getProductMe({ search, page, limit }) {
    return Products.find({ $text: { $search: search } })
      .populate("harvest")
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit);
  }
  getProductSearch({ search, page, limit }) {
    return Products.find({ $text: { $search: search } })
      .populate("harvest")
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit);
  }
  async createProduct() {
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
      photo:
        "https://comefruta.es/wp-content/uploads/2014/05/frutos-secos-variados.jpg",
    });
  }
}

module.exports = ProductsService;
