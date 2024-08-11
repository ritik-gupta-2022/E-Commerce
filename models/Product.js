const mongoose = require('mongoose');
const Review = require('./Review');

const productSchema = new mongoose.Schema({
    brand:{
        type:String,
        trim:true,
        required:true,
    },
    name: {
        type: String,    
        trim: true,      
        required : true  
    },
    img: {
        type : String,
        trim:true,
    },
    price:{
        type: Number,
        required: true,
        min: 0,         

    },
    desc: {
        type: String,
        trim:true,
    },
    category:{
        type:String,
        trim:true,
        required:true,
        default:'men',
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,  
            ref:'Review' 
        }
    ],
    avgRating:{
        type:Number,
        default:0, 
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',  
    }
})

productSchema.post('findOneAndDelete',async function(product){ 
    if(product.reviews.length > 0)
    {
        await Review.deleteMany({_id: { $in:product.reviews }}) 
    }
})

let Product= mongoose.model('Product', productSchema)   
module.exports= Product; 