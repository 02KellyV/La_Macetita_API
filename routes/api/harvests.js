const express = require('express');
const router = express.Router();
const HarvestsService = require('../../services/harvests');
const harvestsService = new HarvestsService();
const auth = require("../../utils/guard");

//GET
router.get('/', async function(req,res,next) {
  try {
    const harvests = await harvestsService.getHarvests();
    res.status(200)
      .json({
        data: harvests,
        message: 'Harvests listed'
      });
  } catch(err) {
    next(err);
  } 
});

//GET BY ID
router.get('/:harvestId', async function(req,res,next) {
  const { harvestId } = req.params;

  try{
    const harvest = await harvestsService.getHarvest({ harvestId });
    res.status(200)
      .json({
        data: harvest,
        message: 'Harvest retrieved'
      });
  } catch(err) {
    next(err);
  }
});

//POST
router.post('/', auth, async function(req,res,next) {
  const { body: harvest, user } = req; //when send data

  try {
    const createdHarvests = await harvestsService.createHarvests({ harvest, user });
    res.status(201)
      .json({
        data: createdHarvests,
        message: 'Harvest created'
      });
  } catch(err) {
    next(err);
  }
});

//UPDATE
router.put('/:harvestId', auth, async function(req,res,next) {
  const { harvestId } = req.params;
  const { body: harvest } = req; //when send data

  try {
    const updatedHarvest = await harvestsService.updateHarvest({ harvestId, harvest });
    res.status(200)
      .json({
        data: updatedHarvest,
        message: 'Harvest updated'
      });
  } catch(err){
    next(err);
  }
});

//DELETE
router.delete('/:harvestId', auth, async function(req,res,next) {
  const { harvestId } = req.params;
  const { user } = req;
  try {
    const deletedHarvest = await harvestsService.deleteHarvest({ harvestId, user });
    res.status(200)
      .json({
        data: deletedHarvest,
        message: 'Harvest deleted'
      });
    } catch(err) {
      next(err);
    }
});

module.exports = router;