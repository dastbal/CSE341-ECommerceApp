const Pizza = require('../models/pizza')
const Order = require('../models/order')




exports.getPizzas =(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
    Pizza.find()
    .then(pizzas=>{
        console.log(pizzas)
        res.render('shop/pizza-list',
        {prods: pizzas ,
            docTitle: 'shop' ,
            path:"/pizzas",  
            isLoggedIn: req.session.isLoggedIn,
        });

    }).catch(e=>{
        console.log(e)
    })

}

exports.getIndex =(req,res,next)=>{
    // console.log("shop.js",adminData.pizzas);
    // res.sendFile(path.join(rootDir,"views","shop.html"))
    Pizza.find()
    .then(pizzas=>{
        res.render('shop/index',
        {prods: pizzas ,
            docTitle: 'shop' ,
            path:"/",  
            isLoggedIn: req.session.isLoggedIn,
        });
        
        
    }).catch(e=>{
        console.log(e)
    })
    
}


exports.getPizza =(req,res,next)=>{

    const pizzaId= req.params.pizzaId
    console.log(pizzaId);
    Pizza.findById(pizzaId)
    .then((pizza)=>{
        res.render('shop/pizza-detail',
        {
            pizza :pizza ,
            docTitle: "Pizza Detail", 
            path : "/pizzas",  
            isLoggedIn: req.session.isLoggedIn,
        })
        console.log(pizza)
    }).catch(e=>{
        console.log(e)
    })
}
    

exports.postCart =(req,res,next)=>{
const pizzaId= req.body.id
Pizza.findById(pizzaId)
.then(pizza=>{
    return req.user.addToCart(pizza);
    
})
.then(result=>{
    console.log(result)
    res.redirect('/cart')
    
})
.catch(e=>console.log(e))


}

exports.getCart =(req,res,next)=>{
    req.user
    .populate('cart.items.pizzaId')
    .then(user=>{
        console.log(user.cart.items)
        
        const  pizzas =  user.cart.items;
        console.log('in get cart get')
        res.render('shop/cart',{
            path:'/cart',
            docTitle:'Cart',
            pizzas:pizzas,  
            isLoggedIn: req.session.isLoggedIn,
        })
    }).catch(e=>console.log(e))


}
// 
exports.postCartDeletePizza =(req,res,next)=>{ 
    const pizzaId= req.body.id
    req.user
    .removeFromCart(pizzaId)
    .then(result=>{
        res.redirect('/cart')
        
    }).catch(e=>console.log(e))
}



exports.postOrder =(req,res,next)=>{
    req.user
    .populate('cart.items.pizzaId')
    .then(user=>{
        console.log(user.cart.items)
        
        const  pizzas =  user.cart.items.map(pizza=>{
            return { 
                pizzaData :{... pizza.pizzaId._doc }, 
                quantity : pizza.quantity}
        });
        const order = new Order({
            user:{
                name: req.user.name,
                userId : req.user
            },
            pizzas:pizzas
    
        })
        return order.save();
    })
    .then(r=>{
        return req.user.clearCart();
    })
    .then(()=>{
        res.redirect('/orders');
    })
    .catch(e=>console.log(e))
}
exports.getOrders =(req,res,next)=>{
    Order.find({'user.userId': req.user._id})
    .then(orders=>{
        console.log(orders)
        res.render('shop/orders',{
            path:'/orders',
            docTitle: 'Orders',
            orders: orders,  
            isLoggedIn: req.session.isLoggedIn,

        })

    }).catch(e=>console.log(e))
}

        







// exports.getPizzas =(req,res,next)=>{
//     // console.log("shop.js",adminData.pizzas);
//     // res.sendFile(path.join(rootDir,"views","shop.html"))
//     Pizza.fetchAll(pizzas=>{
//         res.render('shop/pizza-list',{prods: pizzas ,docTitle: 'shop' ,path:"/pizzas"});

//     });

// }
// exports.getPizza =(req,res,next)=>{

//     const pizzaId= req.params.pizzaId
//     console.log(pizzaId);
//     Pizza.finById(pizzaId,(pizza)=>{
//         res.render('shop/pizza-detail',{pizza :pizza ,docTitle: "Pizza Detail", path : "/pizzas"})
//         console.log(pizza)
//     })
    


// }
// exports.getIndex =(req,res,next)=>{
//     // console.log("shop.js",adminData.pizzas);
//     // res.sendFile(path.join(rootDir,"views","shop.html"))
//     Pizza.fetchAll(pizzas=>{
//         res.render('shop/index',{prods: pizzas ,docTitle: 'shop' ,path:"/"});

//     });

// }

// exports.getCheckout =(req,res,next)=>{
//     // console.log("shop.js",adminData.pizzas);
//     // res.sendFile(path.join(rootDir,"views","shop.html"))
//         res.render('shop/checkout',{docTitle: 'checkout' ,path:"/checkout"});



// }
// exports.getCart =(req,res,next)=>{
//     Cart.getPizza((cart)=>{
//         Pizza.fetchAll(pizzas=>{
//             const cartPizzas=[];
//             for( pizza of pizzas){
//                 const cartPizzaData = cart.pizzas.find(p=> p.id == pizza.id)
//                 if(cartPizzaData){
//                     cartPizzas.push({data:pizza , quantity: cartPizzaData.quantity})
//                 }
//             }
            
//             res.render('shop/cart',{
//                 docTitle: 'cart' ,
//                 path:"/cart",
//                 pizzas: cartPizzas,
//             });

//         })

//     })
   

    

// }
// exports.postCart =(req,res,next)=>{
//     const pizzaId= parseInt(req.body.id);
    
//     Pizza.finById(pizzaId,(pizza)=>{
//         console.log(pizza.price);
//         Cart.addPizza(pizzaId, pizza.price)
//     })
    

    

//     res.redirect('/cart')
   
    

// }
// exports.getOrders =(req,res,next)=>{
//     // console.log("shop.js",adminData.pizzas);
//     // res.sendFile(path.join(rootDir,"views","shop.html"))
   
//         res.render('shop/orders',{docTitle: 'Oders' ,path:"/orders"});

    

// }
// exports.postCartDeletePizza =(req,res,next)=>{ 
//     const pizzaId = parseInt(req.body.id);
//     Pizza.finById(pizzaId,(pizza)=>{

//         Cart.deletePizza(pizzaId,pizza.price);
//         res.redirect('/cart')
//     })
// }
