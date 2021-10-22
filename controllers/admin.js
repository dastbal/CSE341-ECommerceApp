const Pizza = require('../models/pizza');
const {validationResult} = require('express-validator');


exports.getAddPizza = (req,res,next)=>{
    console.log('Adding something');
    //res.sendFile(path.join(rootDir,"views","add-pizza.html"))
    res.render("admin/edit-pizza",{
        docTitle: "Add Pizza" ,
        path : "/admin/add-pizza",
        errorMessage: null,
        oldInput:{ title: '',
            price:'',
            description : '',
            imageUrl: '',
        },
        editing: false ,  
        isLoggedIn: req.session.isLoggedIn,
    });
}

exports.postAddPizza =(req,res,next)=>{
    const title = req.body.title;
    const price = parseInt(req.body.price);
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.render("admin/edit-pizza",{
            docTitle: "Add Pizza" ,
            path : "/admin/add-pizza",
            errorMessage: errors.array()[0].msg,
            oldInput:{ title:title,
                price:price,
                description : description,
                imageUrl:imageUrl,
            },
            editing: false ,  
        });
        }
    const pizza = new Pizza({
        title:title,
        price:price,
        description : description,
        imageUrl:imageUrl,
        userId: req.user
    });
    console.log('Pizza added')
    pizza
    .save().then(r=>{
        console.log('created Pizza')
        res.redirect('/admin/pizzas');
        
    }).catch(e=>{
        {
            const error = new Error(e);
            error.httpStatus = '500'
            next(error)
    }

    })
}


exports.getPizzas =(req,res,next)=>{
    Pizza.find({userId: req.user._id})
    .then(pizzas=>{
        res.render('admin/pizzas',
        {
            prods: pizzas ,
            docTitle: 'Admin Pizzas' ,
            path:"/admin/pizzas",  
            isLoggedIn: req.session.isLoggedIn,
        });

    }).catch(e=> res.redirect('/500'))

}
exports.getEditPizza = (req,res,next)=>{
    const pizzaId = req.params.id
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/')
    }
    Pizza.findById(pizzaId)
    .then((pizza)=>{
        if(!pizza){
            return res.redirect('/');
        }

        res.render("admin/edit-pizza",{
            docTitle: "Edit  Pizza" ,
            path : "/admin/adit-pizza",
            editing: editMode,
            pizza: pizza,
            errorMessage: null,
            oldInput:{ title: '',
                price:'',
                description : '',
                imageUrl: '',
            },

            isLoggedIn: req.session.isLoggedIn,
        });
    }).catch(e=>{
            const error = new Error(e);
            error.httpStatus = '500'
            next(error)
    })
}
exports.postEditPizza = (req,res,next)=>{
    const pizzaId = req.body.id;
    const updatedTitle = req.body.title;
    let updatedPrice = parseInt(req.body.price);
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.render("admin/edit-pizza",{
            docTitle: "Add Pizza" ,
            path : "/admin/edit-pizza",
            errorMessage: errors.array()[0].msg,
            oldInput:{ title:updatedTitle,
                price:updatedPrice,
                description : updatedDescription,
                imageUrl:updatedImageUrl,
            },
            editing: false ,  
        });
        }
    
    
    Pizza.findById(pizzaId)
    .then(pizza =>{
        if (pizza.userId.toString() !== req.user._id.toString()){
            return res.redirect('/');
        }
        pizza.title = updatedTitle;
        pizza.price = updatedPrice;
        pizza.description = updatedDescription;
        pizza.imageUrl = updatedImageUrl
        return pizza.save().then(result =>{
            res.redirect('/admin/pizzas')
            
        })
        
    })
    .catch(e=>{
            const error = new Error(e);
            error.httpStatus = '500'
            next(error)
    })
    
    
}

exports.postDeletePizza =(req,res,next)=>{
    const pizzaId = req.body.id;
    console.log(pizzaId);
    Pizza.deleteOne({_id: pizzaId, userId: req.user._id})
    .then(()=>{
        console.log('finally deleted');
        res.redirect('/admin/pizzas')
    })
    .catch((e)=>
        {
            const error = new Error(e);
            error.httpStatus = '500'
            next(error)
    }
        )

    

}













// exports.getAddPizza = (req,res,next)=>{
//     console.log('Adding something');
//     //res.sendFile(path.join(rootDir,"views","add-pizza.html"))
//     res.render("admin/edit-pizza",{
//         docTitle: "Add Pizza" ,
//         path : "/admin/add-pizza",
//         editing: false ,  
//     });
// }
// exports.postAddPizza =(req,res,next)=>{
//     console.log('Pizza added')
//     const title = req.body.title;
//     const price = parseInt(req.body.price);
//     const description = req.body.description;
//     const pizza = new Pizza(null,title,price,description);
//     pizza.save();
//     //pizzas.push({title: req.body.title , price : req.body.price , description : req.body.description});
//     // const pizzas = Pizza.fetchAll();
//     // console.log(pizzas);
//     res.redirect('/');
// }
// exports.getEditPizza = (req,res,next)=>{
//     const pizzaId = req.params.id
//     const editMode = req.query.edit;
//     if(!editMode){
//         return res.redirect('/')
//     }
//     Pizza.finById(pizzaId,(pizza)=>{
//         if(!pizza){
//             return res.redirect('/');
//         }

//         res.render("admin/edit-pizza",{
//             docTitle: "Edit  Pizza" ,
//             path : "/admin/adit-pizza",
//             editing: editMode,
//             pizza: pizza,
//         });
//     })
// }
// exports.postEditPizza = (req,res,next)=>{
//     let pizzaId = req.body.id;
//     pizzaId = parseInt(pizzaId)
//     const updatedTitle = req.body.title;
//     let updatedPrice = req.body.price;
//     updatedPrice = parseInt(updatedPrice)
//     const updatedDescription = req.body.description;

//     console.log("editing the pizza");
//     console.log(updatedDescription);
    
//     const updatedPizza = new Pizza(pizzaId,updatedTitle,updatedPrice,updatedDescription);
//     updatedPizza.save();
//     console.log(updatedPizza);
//     res.redirect('/admin/pizzas')
    
   
// }

// exports.getPizza =(req,res,next)=>{
//     Pizza.fetchAll(pizzas=>{
//         res.render('admin/pizzas',{prods: pizzas ,docTitle: 'Admin Pizzas' ,path:"/admin/pizzas"});

//     });

// }


// exports.postDeletePizza =(req,res,next)=>{
//     const pizzaId = parseInt(req.body.id);
//     console.log(pizzaId);
//     Pizza.deleteById(pizzaId);
//     res.redirect('/admin/pizzas')

    

// }