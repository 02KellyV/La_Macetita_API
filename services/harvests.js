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
		updateUser.save();
		return newHarvest;
	}

	//PUT
	updateHarvests({ harvestId, harvest }) {
		return Harvests.findByIdAndUpdate(harvestId, harvest);
	}

	//DELETE
	deleteHarvests({ harvestId }) {
		return Harvests.findByIdAndDelete(harvestId);
	}
}

module.exports = HarvestsService;