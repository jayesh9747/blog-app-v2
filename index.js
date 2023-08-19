require("dotenv").config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const Blog = require('./models/blogs')


const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/blog-yt-app').then(
 e=> console.log("MongoDB is connected")
).catch((error)=>{
    console.log("MongoDb error:",error)
})

app.set('view engine',"ejs");
app.set('views',path.resolve("./views"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));



app.get('/',async(req,res)=>{
    const allBlogs =await Blog.find({})
    res.render("home",{
        user: req.user,
        blogs: allBlogs,
    });
});

//login,signin pages
app.use('/user',userRoute);
//blog rendering
app.use('/blog',blogRoute);


const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`server is Running on Port: ${PORT}`);
})