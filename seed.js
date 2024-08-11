const mongoose = require('mongoose');

const Product = require('./models/Product'); 

const products = [
    {
        name:"Apple iphone 14 pro max",
        img:"https://images.unsplash.com/photo-1603898037225-1bea09c550c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
        price:130000,
        desc:"Apple iphone 14 pro max storage:1TB color:black"
    },
    {
        name:"Macbook M2 pro",
        img:"https://images.unsplash.com/photo-1603898037225-1bea09c550c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
        price:250000,
        desc:"Macbook M2 pro color:Grey Storage:1TB Light Weight and Slim"
    },
    {
        name:"Macbook M2 pro",
        img:"https://images.unsplash.com/photo-1530520960548-0d70a1ad430d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fG1hY2Jvb2t8ZW58MHx8MHx8fDA%3D",
        price:250000,
        desc:"Macbook M2 pro color:Grey Storage:1TB Light Weight and Slim"
    },
    {
        name:"iPad",
        img:"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D",
        price:80000,
        desc:"iPad color:Grey Storage:256GB Light Weight and Slim"
    },
    {
        name:"Apple ultra watch",
        img:"https://images.unsplash.com/photo-1664610225203-091cdd45f26e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwcGxlJTIwdWx0cmElMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
        price:80000,
        desc:"health features heart beat, fitness tracker color:orange "
    },
]

async function seedDB(){
    await Product.insertMany(products);  
    console.log("data added successfully")
}

module.exports = seedDB;  // seedDb KO require krege app.js me and run kr lege data adding ke liye