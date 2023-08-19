const {Router} = require('express');
const router = Router();
const User = require('../models/user');


router.get('/signin',(req,res)=>{
    res.render("signin.ejs");
})
router.get("/signup",(req,res)=>{
    res.render('signup.ejs')
})

router.post('/signup',async(req,res)=>{
    const {fullname,email,password} = req.body;

   const user = await User.findOne({
        email,
    })

    if(user) return  res.redirect('/signin.ejs');

    await User.create({
        fullname,
        email,
        password
    });
    res.redirect('/');
})

router.post('/signin',async(req,res)=>{
    const{email,password} = req.body;
    try {
    const token =  await User.matchPasswordAndGenerateToken(email,password);
    return res.cookie("token",token).redirect('/');
   } catch (error) {
    return res.render("signin",{Error:error})
   }
})


router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/');
})
module.exports = router;
