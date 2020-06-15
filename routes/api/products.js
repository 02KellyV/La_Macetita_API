const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');
const productsService = new ProductsService();
const auth = require("../../utils/guard");

//GET SEARCH
router.get('/', async function(req,res,next) {
  let { search, page, limit } = req.query;
  page = Number(page);
  limit = Number(limit);

  try {
    const products = await productsService.getProductSearch({ search, page, limit });
    res.status(200)
      .json({
        data: products,
        message: 'Products listed'
      });
  } catch(err) {
    next(err);
  }   
});

//GET BY ID
router.get('/:productId', async function(req,res,next) {
  const { productId } = req.params;

  try{
    const product = await productsService.getProduct({ productId });
    res.status(200)
      .json({
        data: product,
        message: 'Product retrieved'
      });
  } catch(err) {
    next(err);
  }
});

//POST
router.post('/', async function(req,res,next) {
  const { body: product } = req; //when send data 

  try {
    const createdProducts = await productsService.createProducts({ product });
    res.status(201)
      .json({
        data: createdProducts,
        message: 'Product created'
      });
  } catch(err) {
    next(err);
  }
});

//UPDATE
router.put('/:productId', async function(req,res,next) {
  const { productId } = req.params;
  const { body: product } = req; //when send data

  try {
    const updatedProduct = await productsService.updateProducts({ productId, product });
    res.status(200)
      .json({
        data: updatedProduct,
        message: 'Product updated'
      });
  } catch(err){
    next(err);
  }
});

//DELETE
router.delete('/:productId', async function(req,res,next) {
  const { productId } = req.params;

  try {
    const deletedProduct = await productsService.deleteProducts({ productId });
    res.status(200)
      .json({
        data: deletedProduct,
        message: 'Product deleted'
      });
    } catch(err) {
      next(err);
    }
});

module.exports = router;