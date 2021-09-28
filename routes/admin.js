const path = require('path');

const express = require('express');


const pizzasController = require('../controllers/pizzas');

const router = express.Router();
//const rootDir = require('../utils/path')




router.get('/add-pizza',pizzasController.getAddPizza)
router.post('/add-pizza',pizzasController.postAddPizza)
//router.post('/delete-pizza',pizzasController.postDeletePizza)

exports.routes= router;;
