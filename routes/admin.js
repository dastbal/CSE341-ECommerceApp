const path = require('path');

const express = require('express');


const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
//const rootDir = require('../utils/path')




router.get('/add-pizza', isAuth,adminController.getAddPizza)
router.post('/add-pizza' , isAuth ,adminController.postAddPizza)
router.get('/pizzas' , isAuth ,adminController.getPizzas)
router.get('/edit-pizza/:id' , isAuth ,adminController.getEditPizza)
router.post('/edit-pizza' , isAuth , adminController.postEditPizza)
router.post('/delete-pizza' , isAuth , adminController.postDeletePizza)

exports.routes= router;;
