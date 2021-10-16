const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const  sendgridTranport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTranport({
    auth:{
        api_key:'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',
    }
}));

exports.getLogin = (req,res,next)=>{
    console.log(req.session.isLoggedIn)
    res.render("auth/login",{
        docTitle: "Login" ,
        path : "/login",  
        isLoggedIn: req.session.isLoggedIn,
        errorMessage : req.flash('error')
    });
    
}
exports.postLogin = async (req,res,next)=>{
    const { password , email} = req.body 
    
    try{
    const user =  await User.findOne({email:email})
    if(!user){
        req.flash('error' , 'invalid Email.')
        return res.redirect('/login')
    }
        
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch){
        req.session.isLoggedIn = true ;  
        req.session.user = user;
        await req.session.save()
        return res.redirect('/')
            

    }
    res.redirect('/login')

    }catch(e){
    res.redirect('/login')

    }
        

    
}
exports.postLogout = (req,res,next)=>{
    req.session.destroy((e)=>{
        console.log(e)
        res.redirect('/');

    })
    
}
exports.postSignup = async (req,res,next)=>{
    // const { confirmPassword , password , email} = req.body
    // console.log(email)
    // console.log(password)
    // console.log(confirmPassword)
    // User.findOne({email:email})
    // .then( userDoc =>{
    //     console.log(userDoc)
    //     if(userDoc){
    //         return res.redirect('/signup')
    //     }

    //     return bcrypt.hash(password, 12)
        
    // })
    // .then( hashedPassword => {
    //     const user = new User({
    //         email:email ,
    //         password: hashedPassword ,
    //         cart : { items:[]}
    //     })
    //     return user.save()

    // })
    // .then( result => res.redirect('/login'))
    // .catch( e => console.log(e))
    try{

    const { confirmPassword , password , email} = req.body    
    const userDoc  =  await User.findOne({email:email})
    console.log('usedoc',userDoc)
    if(userDoc){
            return res.redirect('/signup')
        }
    const hashedPassword =  await bcrypt.hash(password, 12)
    const user = new User({
            email:email ,
            password: hashedPassword ,
            cart : { items:[]}
        })
        await user.save();
        res.redirect('/login')
        try{
            
        await transporter.sendMail({
                to: email,
         from: 'pizza@davidpizza.com',
         subject:'Signup Suceeded',
         html: '<h1> You successfully signed up</h1>',
        })
    }catch( e ){
        console.log(e)
    }
    
    }catch(e){
        console.log(e)
    }
}
exports.getSignup = (req,res,next)=>{
    res.render("auth/signup",{
        docTitle: "Signup" ,
        path : "/signup",  
        isLoggedIn: req.session.isLoggedIn,
    });
    
}