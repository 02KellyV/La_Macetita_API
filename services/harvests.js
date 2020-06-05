const harvestMocks = require('../utils/mocks/harvests');

class HarvestsService {
	constructor() {

	}
	getHarvests({ tags }) {
		return	Promise.resolve(harvestMocks);
	}
	getHarvest({ harvestId }) {
		return	Promise.resolve(harvestMocks[0]);
	}
	createHarvests({ harvest }) {
		return	Promise.resolve(harvestMocks[0]);
	}
	updateHarvests({ harvestId, harvest }) {
		return	Promise.resolve(harvestMocks[0]);
	}
	deleteHarvests({ tags }) {
		return	Promise.resolve(harvestMocks[0]);
	}
}

module.exports = HarvestsService;