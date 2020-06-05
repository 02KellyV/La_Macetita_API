const express = require('express');
const router = express.Router();
const HarvestsService = require('../../services/harvests');
const harvestsService = new HarvestsService();

router.get('/', async function(req,res){
	const { tags } = req.query;
	try {
		const harvests = await harvestsService.getHarvests({ tags });
		res.render("harvests", { harvests });
	} catch(err) {
		next(err);
	}
});

module.exports = router;