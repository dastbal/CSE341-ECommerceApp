const Pizza = require('../models/pizza')
exports.getAddPizza = (req,res,next)=>{
    console.log('Adding something');
    //res.sendFile(path.join(rootDir,"views","add-pizza.html"))
    res.render("add-pizza",{
        docTitle: "Add Pizza" ,
        path : "/admin/add-pizza"
    });
}
exports.postAddPizza =(req,res,next)=>{
    console.log('Pizza added')
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const pizza = new Pizza(title,price,description);
    pizza.save();
    //pizzas.push({title: req.body.title , price : req.body.price , description : req.body.description});
    // const pizzas = Pizza.fetchAll();
    // console.log(pizzas);
    res.redirect('/');
}

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
        res.render('shop',{prods: pizzas ,docTitle: 'shop' ,path:"/"});

    });

}