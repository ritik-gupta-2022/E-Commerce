const express = require('express');
const Product= require('../models/Product');  
const Review= require('../models/Review'); 
const router = express.Router(); 
const {validateProduct, isLoggedIn, isSeller, isProductAuthor} = require('../middleware');


router.get('/products' ,isLoggedIn ,async (req,res)=>{
    try{
        let products=await Product.find({}); 
        res.render('./products/index',{products, currentUser: req.user,success: req.flash('success'), error: req.flash('error')});
    }
    catch(e){
        res.status(500).render('error',{err:e.message}) 
    }
});

router.get('/product/new',isLoggedIn, isSeller,(req,res)=>{
    try{
        res.render('./products/new',{ currentUser: req.user});
    }
    catch(e){
        res.status(500).render('error',{err:e.message}) 
    }
})
router.post('/products',isLoggedIn,validateProduct,async(req,res)=>{
    try{
        let { brand,name,img,price,desc,category}=req.body;
        await Product.create({ brand,name,img,price,desc,category, author:req.user._id}); 
        req.flash('success' , 'Product added successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message}) 
    }
})

router.get('/products/:id',isLoggedIn, async(req,res)=>{
    try{
        let {id} =req.params;  
        let foundProduct = await Product.findById(id).populate('reviews');  
        res.render('products/show',{foundProduct,currentUser: req.user,success: req.flash('success'), error: req.flash('error')});
    }
    catch(e){
        res.status(500).render('error',{err:e.message}) 
    }
})

router.get('/products/:id/edit' ,isLoggedIn, isSeller,isProductAuthor ,async(req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        
        res.render('products/edit',{foundProduct,currentUser: req.user,success: req.flash('success'), error: req.flash('error')});
    }
    catch(e){
        res.status(500).render('error',{err:e.message}) 
    }
})
router.patch('/products/:id',isLoggedIn,validateProduct, async (req,res)=>{
    try{
        let {id} =req.params;
        let {name, img, price, desc,category}=req.body;
        await Product.findByIdAndUpdate(id, {name:name, img:img, price:price, desc:desc,category}); 
        req.flash('success', 'product edited successfully');
        res.redirect(`/products/${id}`); 
    }
    catch(e){
        res.status(500).render('error',{err:e.message}) 
    }
})

router.delete('/products/:id' ,isLoggedIn,isSeller,isProductAuthor, async(req,res)=>{
    try{
        
        let {id}=req.params;
    
        let product = await Product.findById(id);
    
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product removed Successfully')
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message}) 
    }
})


router.get('/categories/men'  ,async (req,res)=>{
    try{
        let products=await Product.find({});
        res.render('./products/men',{products, currentUser: req.user,success: req.flash('success'), error: req.flash('error')});
    }
    catch(e){
        res.send("l");
        res.status(500).render('error',{err:e.message}) 
    }
});

router.get('/categories/women'  ,async (req,res)=>{
    try{
        let products=await Product.find({}); 
        res.render('./products/women',{products, currentUser: req.user,success: req.flash('success'), error: req.flash('error')});
    }
    catch(e){
        res.send("l");
        res.status(500).render('error',{err:e.message}) 
    }
});


router.get('/categories/accesories'  ,async (req,res)=>{
    try{
        let products=await Product.find({}); 
        res.render('./products/accesories',{products, currentUser: req.user,success: req.flash('success'), error: req.flash('error')});
    }
    catch(e){
        res.send("l");
        res.status(500).render('error',{err:e.message}) 
    }
});
module.exports= router; 
