const express = require('express');
const { isLoggedIn } = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');
const router = express.Router();

router.get('/user/cart', isLoggedIn, async(req,res)=>{
    let userId = req.user._id;
    const user = await User.findById(userId).populate('cart'); 
    const totalAmount = user.cart.reduce((sum , curr)=> sum+curr.price , 0)
    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart',{user, totalAmount , productInfo , currentUser:req.user , success: req.flash('success') , error: req.flash('error')})
})

router.post('/user/:productId/add', isLoggedIn,async (req,res)=>{
    let {productId} = req.params 
    const Userid=req.user._id;   
    const product = await Product.findById(productId); 
    const user= await User.findById(Userid); 
    user.cart.push(product); 
    await user.save();
    res.redirect(`/products/${productId}`);
    
})

router.get('/about', async(req,res)=>{
    res.render('about/about',{ currentUser:req.user , success: req.flash('success') , error: req.flash('error')})
})

module.exports=router;