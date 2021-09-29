const Pizza = require('../models/pizza')


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
        console.log(pizza)
    })
    
    res.redirect('/');


}
exports.getIndex =(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
    Pizza.fetchAll(pizzas=>{
        res.render('shop/index',{prods: pizzas ,docTitle: 'shop' ,path:"/pizzas"});

    });

}

exports.getCheckout =(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
        res.render('shop/checkout',{docTitle: 'checkout' ,path:"/checkout"});



}
exports.getCart =(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
   
        res.render('shop/cart',{docTitle: 'cart' ,path:"/cart"});

    

}
exports.getOrders =(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
   
        res.render('shop/orders',{docTitle: 'Oders' ,path:"/orders"});

    

}
