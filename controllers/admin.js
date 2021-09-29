const Pizza = require('../models/pizza')
exports.getAddPizza = (req,res,next)=>{
    console.log('Adding something');
    //res.sendFile(path.join(rootDir,"views","add-pizza.html"))
    res.render("admin/add-pizza",{
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

exports.getPizza =(req,res,next)=>{
    Pizza.fetchAll(pizzas=>{
        res.render('admin/pizzas',{prods: pizzas ,docTitle: 'Admin Pizzas' ,path:"/admin/pizzas"});

    });
}
exports.getEditPizza =(req,res,next)=>{
    Pizza.fetchAll(pizzas=>{
        res.render('admin/edit-pizza',{prods: pizzas ,docTitle: 'Admin -Edit Pizza' ,path:"/admin/edit-pizza"});

    });
}