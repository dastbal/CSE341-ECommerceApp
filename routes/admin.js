const path = require('path');

const express = require('express');


const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const {check , body} = require('express-validator');


const router = express.Router();
//const rootDir = require('../utils/path')




router.get('/add-pizza', isAuth,adminController.getAddPizza)
router.post('/add-pizza' ,
[
    body('title',
    'The Title need to have at least 6 characters')
    .isString()
    .isLength({min:6})
    .trim()
    ,
    body('price',
    'Please insert a number')
    .isFloat()
    .trim()
    ,
    body('imageUrl',
    'Please insert a valid URL')
    .isURL()
    .trim()
    ,
    body('description',
    'The description need to have at least 10 characters')
    .isString()
    .isLength({min:10})
    .trim(),
], isAuth ,adminController.postAddPizza)
router.get('/pizzas' , isAuth ,adminController.getPizzas)
router.get('/edit-pizza/:id' , isAuth ,adminController.getEditPizza)
router.post('/edit-pizza' ,[
    body('title',
    'The Title need to have at least 6 characters')
    .isString()
    .isLength({min:6})
    .trim()
    ,
    body('price',
    'Please insert a number')
    .isFloat()
    .trim()
    ,
    body('imageUrl',
    'Please insert a valid URL')
    .isURL()
    .trim()
    ,
    body('description',
    'The description need to have at least 10 characters')
    .isString()
    .isLength({min:10})
    .trim(),
], isAuth , adminController.postEditPizza)
router.post('/delete-pizza' , isAuth , adminController.postDeletePizza)

exports.routes= router;;
