
const shopController = require('../controllers/shop');

const express = require('express');

const router = express.Router();

router.get('/',shopController.getIndex);

router.get('/pizzas',shopController.getPizzas);

router.get('/pizzas/:pizzaId',shopController.getPizza)

router.get('/cart',shopController.getCart)
router.post('/cart',shopController.postCart)
router.post('/cart-delete-pizza',shopController.postCartDeletePizza)

router.get('/checkout',shopController.getCheckout)

router.get('/orders',shopController.getOrders)


module.exports = router;