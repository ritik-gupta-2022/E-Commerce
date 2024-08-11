require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');  
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');  
const session = require('express-session');  
const productRoutes = require('./routes/product');  
const reviewRoutes = require('./routes/review'); 
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const passport = require('passport'); 
const LocalStrategy = require('passport-local');  
const User = require('./models/User') 
// const url = "mongodb+srv://ag0936:ag0936@cluster0.23bhqnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT= process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));


let configSession={
    secret: 'ag0936',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires: Date.now() + 7*24*60*60*1000,  
    }
}

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true})); 
app.use(session(configSession));
app.use(flash());  
app.use(passport.initialize());   
app.use(passport.session()); 

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

app.use(productRoutes); 
app.use(reviewRoutes); 
app.use(authRoutes);
app.use(cartRoutes);


app.get('/' , (req,res)=>{
    res.render('home',{currentUser:req.user});
})

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})


app.use((req,res,next)=>{
    res.locals.success= req.flash('success');
    res.locals.error  = req.flash('error');
    next();
}) 

passport.use(new LocalStrategy(User.authenticate()));

app.listen(PORT,(req,res)=>{
    console.log("server connected");
})

 



