const express = require('express');
const router = express.Router();
const CategoriesService = require('../../services/categories');
const categoriesService = new CategoriesService();
const auth = require("../../utils/guard");

//GET 
router.get('/', async function(req,res,next) {
    try {
      const categories = await categoriesService.getCategories();
      res.status(200)
        .json({
          data: categories,
          message: 'Categories listed'
        });
    } catch(err) {
      next(err);
    } 
  });

//GET BY ID
router.get('/:categoriesId', async function(req,res,next) {
  const { categoriesId } = req.params;

  try{
    const category = await categoriesService.getCategory({ categoriesId });
    res.status(200)
      .json({
        data: category,
        message: 'Category retrieved'
      });
  } catch(err) {
    next(err);
  }
});

//POST
router.post('/', async function(req,res,next) {
  const { body: category } = req; //when send data 

  try {
    const createdCategories = await categoriesService.createCategories({ category });
    res.status(201)
      .json({
        data: createdCategories,
        message: 'Category created'
      });
  } catch(err) {
    next(err);
  }
});

//UPDATE
router.put('/:categoryId', async function(req,res,next) {
  const { categoryId } = req.params;
  const { body: category } = req; //when send data

  try {
    const updatedCategory = await categoriesService.updateCategory({ categoriesId, category });
    res.status(200)
      .json({
        data: updatedCategory,
        message: 'Category updated'
      });
  } catch(err){
    next(err);
  }
});

//DELETE
router.delete('/:categoryId', async function(req,res,next) {
  const { categoryId } = req.params;

  try {
    const deletedCategory = await categoriesService.deleteCategory({ categoryId });
    res.status(200)
      .json({
        data: deletedCategory,
        message: 'Category deleted'
      });
    } catch(err) {
      next(err);
    }
});

module.exports = router;