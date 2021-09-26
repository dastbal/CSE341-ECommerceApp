
const rootDir = require('../utils/path')
const adminData = require('./admin')

const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
    const pizzas = adminData.pizzas;
    res.render('shop',{prods:pizzas,docTitle: 'shop' ,path:"/"});

})

module.exports = router;