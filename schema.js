const Joi = require('joi');

const productSchema = Joi.object({
    brand:Joi.string(),
    name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.string().required(),
    desc: Joi.string().required(),
    category:Joi.string(),
})
const reviewSchema = Joi.object({
    rating: Joi.string().min(0).max(5).required(),
    comment: Joi.string().required(),

})

module.exports={productSchema,reviewSchema}; 