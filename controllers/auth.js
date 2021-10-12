const User = require('../models/user');

exports.getLogin = (req,res,next)=>{
    console.log(req.session.isLoggedIn)
    res.render("auth/login",{
        docTitle: "Login" ,
        path : "/login",  
        isLoggedIn: req.session.isLoggedIn,
    });
    
}
exports.postLogin = (req,res,next)=>{
    
    User.findById('615e45979b5fa054f27bae16')
    .then(user=>{
        req.session.isLoggedIn = true ;  
        req.session.user = user;
        req.session.save(()=>{
            res.redirect('/')

        })
    }).catch(e=>console.log(e))
    
}
exports.postLogout = (req,res,next)=>{
    req.session.destroy((e)=>{
        console.log(e)
        res.redirect('/');

    })
    
}