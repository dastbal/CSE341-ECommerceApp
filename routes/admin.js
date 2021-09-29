const path = require('path');

const express = require('express');


const adminController = require('../controllers/admin');

const router = express.Router();
//const rootDir = require('../utils/path')




router.get('/add-pizza',adminController.getAddPizza)
router.post('/add-pizza',adminController.postAddPizza)
router.get('/pizzas',adminController.getPizza)
router.get('/edit-pizza',adminController.getEditPizza)
//router.post('/delete-pizza',pizzasController.postDeletePizza)

exports.routes= router;;
