const express = require('express');
const router = express.Router();   
const User= require('../models/User');  
const passport = require('passport');  

router.get('/register' , (req,res)=>{
    res.render('auth/signup',{currentUser:req.user,error:req.flash('error') , success:req.flash('success')});  
})

router.post('/register',async (req,res)=>{
    try{
        let {username, email, role, password }=(req.body);
        let newUser= new User({ email, username, role}) 
        let createdNewUser = await User.register(newUser, password);  
   
        req.login(createdNewUser, (err)=>{
            if(err)
            {
                req.flash('error','please enter valid details')
                return res.redirect('/signup');
            }
            req.flash('success','welcome');
            return res.redirect('/products');
    })}
    catch(err){
        req.flash('error', err.message);
        res.redirect('/register');
    }
})

router.get('/login', (req,res)=>{
    res.render('auth/login',{currentUser:req.user,error: req.flash('error'),success: req.flash('success')});
})

router.post('/login',   passport.authenticate('local',{ 
    failureRedirect: '/login',  
    failureMessage: true        
 }),
   (req,res)=>{
    req.flash('success','logged in Successfully');
    res.redirect('/products');
})

router.get('/logout' , (req,res)=>{
   ()=>{ req.logOut({}); }
   res.redirect('/login');
})

module.exports = router;