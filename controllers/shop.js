const Pizza = require('../models/pizza')
const Cart = require('../models/cart')


// exports.postDeletePizza =(req,res,next)=>{
//     // pizzas = pizzas.filter((pizza)=>{ 
//         //  pizza.title != req.body.id
//         // });
//         console.log('Pizza deleted')
//         console.log(req.body.id)
//         const id = req.body.id
//         const pizzas= Pizza.delete(id);
//         console.log(pizzas);
//         res.redirect('/');
    
    
// }
exports.getPizzas =(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
    Pizza.fetchAll(pizzas=>{
        res.render('shop/pizza-list',{prods: pizzas ,docTitle: 'shop' ,path:"/pizzas"});

    });

}
exports.getPizza =(req,res,next)=>{

    const pizzaId= req.params.pizzaId
    console.log(pizzaId);
    Pizza.finById(pizzaId,(pizza)=>{
        res.render('shop/pizza-detail',{pizza :pizza ,docTitle: "Pizza Detail", path : "/pizzas"})
        console.log(pizza)
    })
    


}
exports.getIndex =(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
    Pizza.fetchAll(pizzas=>{
        res.render('shop/index',{prods: pizzas ,docTitle: 'shop' ,path:"/"});

    });

}

exports.getCheckout =(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
        res.render('shop/checkout',{docTitle: 'checkout' ,path:"/checkout"});



}
exports.getCart =(req,res,next)=>{
    Cart.getPizza((cart)=>{
        Pizza.fetchAll(pizzas=>{
            const cartPizzas=[];
            for( pizza of pizzas){
                const cartPizzaData = cart.pizzas.find(p=> p.id == pizza.id)
                if(cartPizzaData){
                    cartPizzas.push({data:pizza , quantity: cartPizzaData.quantity})
                }
            }
            
            res.render('shop/cart',{
                docTitle: 'cart' ,
                path:"/cart",
                pizzas: cartPizzas,
            });

        })

    })
   

    

}
exports.postCart =(req,res,next)=>{
    const pizzaId= parseInt(req.body.id);
    
    Pizza.finById(pizzaId,(pizza)=>{
        console.log(pizza.price);
        Cart.addPizza(pizzaId, pizza.price)
    })
    

    

    res.redirect('/cart')
   
    

}
exports.getOrders =(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
   
        res.render('shop/orders',{docTitle: 'Oders' ,path:"/orders"});

    

}
exports.postCartDeletePizza =(req,res,next)=>{ 
    const pizzaId = parseInt(req.body.id);
    Pizza.finById(pizzaId,(pizza)=>{

        Cart.deletePizza(pizzaId,pizza.price);
        res.redirect('/cart')
    })
}
