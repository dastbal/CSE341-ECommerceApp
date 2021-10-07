const path = require('path');

const express = require('express');


const adminController = require('../controllers/admin');

const router = express.Router();
//const rootDir = require('../utils/path')




router.get('/add-pizza',adminController.getAddPizza)
router.post('/add-pizza',adminController.postAddPizza)
router.get('/pizzas',adminController.getPizzas)
router.get('/edit-pizza/:id',adminController.getEditPizza)
router.post('/edit-pizza', adminController.postEditPizza)
router.post('/delete-pizza', adminController.postDeletePizza)

exports.routes= router;;
