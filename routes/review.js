const express = require('express');
const router =express.Router(); 
const Review= require('../models/Review');  
const Product= require('../models/Product');  
const {validateReview,isLoggedIn} = require('../middleware');
router.post('/products/:id/review',isLoggedIn,validateReview,async (req,res)=>{
    try{
        let {id} = req.params;
        let {rating ,comment}=req.body;
        const product = await Product.findById(id);   
        const review =new Review({rating ,comment}); 
    
        product.reviews.push(review);  
        await review.save();
        product.avgRating=(parseInt(product.avgRating)+parseInt(rating));
        await product.save();  
        res.redirect(`/products/${id}`); 
    }
    catch(e){
        res.status(500).render('error',{err:e.message,currentUser: req.user})
    }
})

module.exports = router;