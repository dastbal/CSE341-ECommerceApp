const Pizza = require('../models/pizza');


exports.getAddPizza = (req,res,next)=>{
    console.log('Adding something');
    //res.sendFile(path.join(rootDir,"views","add-pizza.html"))
    res.render("admin/edit-pizza",{
        docTitle: "Add Pizza" ,
        path : "/admin/add-pizza",
        editing: false ,  
    });
}

exports.postAddPizza =(req,res,next)=>{
    const title = req.body.title;
    const price = parseInt(req.body.price);
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const pizza = new Pizza({
        title:title,
        price:price,
        description : description,
        imageUrl:imageUrl,
        userId:req.user
    });
    console.log('Pizza added')
    pizza
    .save().then(r=>{
        console.log('created Pizza')
        res.redirect('/admin/pizzas');
        
    }).catch(e=>{
        console.log(e)

    })
}


exports.getPizzas =(req,res,next)=>{
    Pizza.find()
    .then(pizzas=>{
        res.render('admin/pizzas',
        {
            prods: pizzas ,
            docTitle: 'Admin Pizzas' ,
            path:"/admin/pizzas"
        });

    }).catch(e=> console.log(e))

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
        });
    }).catch(e=>console.log(e))
}
exports.postEditPizza = (req,res,next)=>{
    const pizzaId = req.body.id;
    const updatedTitle = req.body.title;
    let updatedPrice = parseInt(req.body.price);
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    
    
    Pizza.findById(pizzaId)
    .then(pizza =>{
        pizza.title = updatedTitle;
        pizza.price = updatedPrice;
        pizza.description = updatedDescription;
        pizza.imageUrl = updatedImageUrl
        return pizza.save()
        
    })
    .then(result =>{
        res.redirect('/admin/pizzas')
        
    }).catch(e=>console.log(e))
    
    
}

exports.postDeletePizza =(req,res,next)=>{
    const pizzaId = req.body.id;
    console.log(pizzaId);
    Pizza.findByIdAndRemove(pizzaId)
    .then(()=>{
        console.log('finally deleted');
        res.redirect('/admin/pizzas')
    })
    .catch(e=>console.log(e))

    

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