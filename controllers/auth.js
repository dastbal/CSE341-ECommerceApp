const User = require('../models/user');
const {validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const  sendgridTranport = require('nodemailer-sendgrid-transport');
const { exists } = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTranport({
    auth:{
        api_key:'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',
    }
}));

exports.getLogin = (req,res,next)=>{    res.render("auth/login",{
        docTitle: "Login" ,
        path : "/login",  
        isLoggedIn: req.session.isLoggedIn,
        errorMessage : req.flash('error'),
        oldInput: {
            email: ""

        }
    });
    
}
exports.postLogin = async (req,res,next)=>{
    const { password , email} = req.body 
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).render("auth/login",{
            docTitle: "Login" ,
            path : "/login",  
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email:email

            }
        })
    }
    
    try{
    const user =  await User.findOne({email:email})
    if(!user){
        req.flash('error' , 'invalid Email.')
        return res.redirect('/login')
    }
    
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch){
        req.session.isLoggedIn = true ;  
        req.session.userName =  user.name ;  
        req.session.user = user;
        await req.session.save()
        return res.redirect('/')
        
        
    }
    if(!doMatch){
        req.flash('error' , 'invalid Password.')
        return res.redirect('/login')
    }
    res.redirect('/login')

    }catch(e){
    res.redirect('/login')

    }
        

    
}
exports.postLogout = (req,res,next)=>{
    req.session.destroy((e)=>{
        console.log('jshshjah')
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

    const { name, phone ,confirmPassword , password , email} = req.body    
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).render("auth/signup",{
                docTitle: "Signup" ,
                path : "/signup",  
                errorMessage: errors.array()[0].msg,
                oldInput: {
                    email:email,
                    name:name,
                    phone:phone,
                    password:password,
                    confirmPassword:confirmPassword,
    
                }
            })
        }
    const userDoc  =  await User.findOne({email:email})
    console.log('usedoc',userDoc)
    if(userDoc){
        req.flash('error', 'E-mail exists already, please pick a different one')
            return res.redirect('/signup')
        }
    const hashedPassword =  await bcrypt.hash(password, 12)
    const user = new User({
            name:name ,
            phone:phone ,
            email:email ,
            password: hashedPassword ,
            cart : { items:[]}
        })
        await user.save();
        res.redirect('/login')
        try{
            
        await transporter.sendMail({
                to: email,
         from: 'davidxsteven@gmail.com',
         subject:'Signup Suceeded',
         html: '<h1> You successfully signed up</h1>',
        })
    }catch( e ){
        throw new Error(e)
    }
    
    }catch(e){
        const error = new Error(e);
        error.httpStatus = '500'
        next(error)
}
}
exports.getSignup = (req,res,next)=>{
    res.render("auth/signup",{
        docTitle: "Signup" ,
        path : "/signup",  
        errorMessage : req.flash('error'),
        oldInput: {
            email:'',
            name:'',
            phone:'',
            password:'',
            confirmPassword:'',

        }

    });
    
}
exports.getReset = (req,res,next)=>{
    res.render("auth/reset",{
        docTitle: "Reset" ,
        path : "/signup",  
        errorMessage : req.flash('error'),
    });
    
}
exports.postReset = async (req,res,next)=>{
    try{
    crypto.randomBytes(32, async (e,buffer)=>{
        if(e){
            console.log(e);
            return res.redirect('/reset')
            
        }
        const token = buffer.toString('hex')
          
        
        const user =  await User.findOne({email: req.body.email});
        if(!user){
            req.flash('error','No account with that email found.');
            return res.redirect('/reset')
        }
        user.resetToken = token
        user.resetTokenExpiration =  Date.now() + 900000
        await user.save()
        res.redirect('/')




        await transporter.sendMail({
            to: req.body.email,
            from: 'davidxsteven@gmail.com',
            subject:'Password Reset',
            html: `
            <h1> You requested a password</h1>
            <p> Click this <a  href="http://localhost:3000/reset/${token}" >link</a> to set a new password</p>
            `,
            
        })
 
        


    })
        
    }catch(e){
        const error = new Error(e);
        error.httpStatus = '500'
        next(error)
}
    
    
}

exports.getNewPassword = async (req,res,next)=>{
    const {token} = req.params
    try{

        const user  = await User.findOne({resetToken:token , resetTokenExpiration:{$gt: Date.now()}})
        res.render("auth/new-password",{
            docTitle: "New Password" ,
            path : "/new-password",  
            errorMessage : req.flash('error'),
            userId: user._id ,
            token : token ,
        });
    }catch(e){
        res.redirect('/')

    }
}
exports.postNewPassword = async (req,res,next)=>{
    const { token, id , password} = req.body
    try{

        const user = await User.findOne({resetToken : token  , resetTokenExpiration:{$gt: Date.now()} , _id: id})
        if(!user){
        req.flash('error' , 'invalid Information.')
        return res.redirect('/login')
    }
    

    const hashedPassword =  await bcrypt.hash(password, 12)
    user.password = hashedPassword
    user.resetToken = undefined
    user.resetTokenExpiration = undefined
    await user.save()
    res.redirect('/login')
    await transporter.sendMail({
        to: email,
        from: 'davidxsteven@gmail.com',
        subject:'Password Changed',
        html: `
        <h1> You Changed  the Password</h1>   `,
        
    })

    
}catch(e){
    const error = new Error(e);
    error.httpStatus = '500'
    next(error)
}
}