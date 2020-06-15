const {Harvests, Users} = require('../models');

class HarvestsService {
	constructor() {

	}

	//GET
	getHarvests() {
		return Harvests.find();
	}

	//GET BY ID
	getHarvest({ harvestId }) {
		return Harvests.findById(harvestId);		
	}

	//POST
	async createHarvests({ harvest, user }) {
		harvest.owner = user.id;
		const newHarvest = await Harvests.create(harvest);
		const updateUser = await Users.findById(user.id);
		updateUser.harvests.push(newHarvest._id);
		await updateUser.save();
		return newHarvest;
	}

	//PUT
	updateHarvest({ harvestId, harvest }) {
		return Harvests.findByIdAndUpdate(harvestId, harvest);
	}

	//DELETE
	async deleteHarvest({ harvestId, user }) {
		const vari = await Users.findById(user.id);
		vari.harvests = vari.harvests.filter(val => !val === harvestId)
		await vari.save();
		return await Harvests.findByIdAndDelete(harvestId);
	}
}

module.exports = HarvestsService;