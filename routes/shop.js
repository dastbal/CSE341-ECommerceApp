
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const express = require('express');

const router = express.Router();

router.get('/',shopController.getIndex);

router.get('/pizzas',shopController.getPizzas);

router.get('/pizzas/:pizzaId',shopController.getPizza)

router.post('/comment',shopController.postComment)

router.get('/cart' , isAuth ,shopController.getCart)
router.post('/cart' , isAuth ,shopController.postCart)
router.post('/cart-delete-pizza' , isAuth ,shopController.postCartDeletePizza)

router.post('/create-order' , isAuth ,shopController.postOrder)
router.get('/orders' , isAuth ,shopController.getOrders)



module.exports = router;