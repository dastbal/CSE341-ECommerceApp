const path = require('path');
const express = require('express');

const router = express.Router();


const rootDir = require('../utils/path')

let pizzas = [];


router.get('/add-pizza',(req,res,next)=>{
    console.log('Adding something');
    //res.sendFile(path.join(rootDir,"views","add-pizza.html"))
    res.render("add-pizza",{docTitle: "Add Pizza" ,path : "/admin/add-pizza"});
})
router.post('/add-pizza',(req,res,next)=>{
    console.log('Pizza added')
    pizzas.push({title: req.body.title , price : req.body.price});
    console.log(pizzas);
    res.redirect('/');

})

exports.routes= router;;
exports.pizzas = pizzas;