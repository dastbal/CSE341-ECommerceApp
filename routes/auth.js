
const express = require('express');
const {check , body} = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();



router.get('/login', authController.getLogin)
router.post('/login',
[
    body('email')
    .isEmail()
    .withMessage('Please Insert a valid Email.')
    .normalizeEmail()
    ,
    body('password',
    'Please enter a pasword with only text and number and at least 6 characters')
    .isLength({min:6})
    .isAlphanumeric()
    .trim(),

],
 authController.postLogin)
router.get('/signup', authController.getSignup)
router.post('/signup',
[
    check('email')
    .isEmail()
    .withMessage('Please Insert  a valid Email.')
    .normalizeEmail()
    .custom((value,{req})=>{
        return true
    }),
    body('password',
    'Please enter a pasword with only text and number and at least 6 characters')
    .isLength({min:6})
    .isAlphanumeric().trim(),
    body('confirmPassword')
    .trim()
    .custom((value,{req})=>{
        if(value!== req.body.password){
            throw new Error('Passwords have to match.')
        }
        return true
    })


]
,authController.postSignup)
router.post('/logout', authController.postLogout)
router.post('/reset', authController.postReset)
router.get('/reset', authController.getReset)
router.get('/reset/:token', authController.getNewPassword)
router.post('/new-password', authController.postNewPassword)

module.exports= router;
