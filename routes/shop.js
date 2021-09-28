
const pizzasController = require('../controllers/pizzas');

const express = require('express');

const router = express.Router();

router.get('/',pizzasController.getPizzas)

module.exports = router;