const express = require('express');
const router = express.Router();
const HarvestsService = require('../../services/harvests');
const harvestsService = new HarvestsService();

router.get('/', async function(req,res,next) {
  const { tags } = req.query;
  console.log('req', req.query);

  try {
    const harvests = await harvestsService.getHarvests({ tags });
    res.status(200)
      .json({
        data: harvests,
        message: 'Products listed'
      });
  } catch(err) {
    next(err);
  } 
});


router.get('/:harvestId', async function(req,res,next) {
  const { harvestId } = req.params;
  console.log('req', req.params);

  try{
    const harvest = await harvestsService.getHarvest({ harvestId });
    res.status(200)
      .json({
        data: harvest,
        message: 'Product retrieved'
      });
  } catch(err) {
    next(err);
  }
});


router.post('/', async function(req,res,next) {
  const { body: harvest } = req; //when send data 
  console.log('req', req.body);

  try {
    const createdHarvests = await harvestsService.createHarvests({ harvest });
    res.status(201)
      .json({
        data: createdHarvests,
        message: 'Product created'
      });
  } catch(err) {
    next(err);
  }
});


router.put('/:harvestId', async function(req,res,next) {
  const { harvestId } = req.params;
  const { body: harvest } = req; //when send data
  console.log('req', req);

  try {
    const updatedHarvest = await harvestsService.updateHarvests({ harvestId, harvest });
    res.status(200)
      .json({
        data: updatedHarvest,
        message: 'Product updated'
      });
  } catch(err){
    next(err);
  }
});


router.delete('/:harvestId', async function(req,res,next) {
  const { harvestId } = req.params;
  console.log('req', req);

  try {
    const deletedHarvest = await harvestsService.deleteHarvests({ harvestId });
    res.status(200)
      .json({
        data: deletedHarvest,
        message: 'Product deleted'
      });
    } catch(err) {
      next(err);
    }
});

module.exports = router;