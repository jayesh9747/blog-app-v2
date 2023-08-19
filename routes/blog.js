const {Router} = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blogs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/add-new',async(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    })
})

router.post('/add-new',upload.single("coverImage"),async(req,res)=>{
    const{title,blogBody} = req.body;
   const blog= await Blog.create({
        title:req.body.title,
        body:req.body.blogBody,
        coverImageURL:`/uploads/${req.file.filename}`,
        createdBy:req.user._id,
    })
   
   res.redirect(`/blog/${blog._id}`);
})

module.exports = router;