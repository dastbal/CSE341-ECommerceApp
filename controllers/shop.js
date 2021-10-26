const Pizza = require('../models/pizza')
const Order = require('../models/order')
const Comment = require('../models/comment')




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


exports.getPizza = async (req,res,next)=>{
    try{

        
    const {pizzaId}= req.params
    const pizza =  await Pizza.findById(pizzaId);
    const comments = await Comment.find({pizzaId: pizzaId})
    

    if(req.session.user){

        
        res.render('shop/pizza-detail',
        {
            pizza :pizza ,
            docTitle: "Pizza Detail", 
            path : "/pizzas",
            comments: comments,
            userLoggedId : req.session.user._id.toString()
        })
    }else{
        res.render('shop/pizza-detail',
        {
            pizza :pizza ,
            docTitle: "Pizza Detail", 
            path : "/pizzas",
            comments: comments,
            userLoggedId : null
        })
    }
        
    }catch(e){
        console.log(e)
    }


}
exports.postCommentDelete = async (req,res,next)=>{
    try{
        const { pizzaId, id} = req.body
        await Comment.deleteOne({_id:id})

        res.redirect(`/pizzas/${pizzaId}`)

    }catch(e){
    const error = new Error(e);
    error.httpStatus = '500'
    next(error)
}

}
exports.postComment = async (req,res,next)=>{
    try{
        console.log(' saving a comment')
        
        const  { comment , id} = req.body
        const userComment = req.session.user
        const pizza =  await Pizza.findById(id)
        const newComment = await new Comment({
        comment: comment,
        pizzaId: pizza,
        user : {
            name: userComment.name ,
             userId: userComment._id
            }
    })
    await newComment.save()    
    
    
    res.redirect(`/pizzas/${id}`)
    
}catch(e){
    const error = new Error(e);
    error.httpStatus = '500'
    next(error)
}

    
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
.catch(e=>{
    const error = new Error(e);
    error.httpStatus = '500'
    next(error)
})


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
    }).catch(e=>{
        const error = new Error(e);
        error.httpStatus = '500'
        next(error)
    })


}
// 
exports.postCartDeletePizza =(req,res,next)=>{ 
    const pizzaId= req.body.id
    req.user
    .removeFromCart(pizzaId)
    .then(result=>{
        res.redirect('/cart')
        
    }).catch(e=>{
        const error = new Error(e);
        error.httpStatus = '500'
        next(error)
    })
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
                email: req.user.email,
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
    .catch(e=>{
        const error = new Error(e);
        error.httpStatus = '500'
        next(error)
    })
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

    }).catch(e=>{
        const error = new Error(e);
        error.httpStatus = '500'
        next(error)
    })
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
