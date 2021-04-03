const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

router.get('/',(req,res,next)=>{
    res.render('Home.ejs',{pageTitle:'Home'});
});

// router.get('/admin_login',(req,res,next)=>{
//     res.render('login.ejs',{pageTitle:'Admin Login',
//     login_page:true,
//     loginAs:'Admin'
//     });
// });

// router.get('/student_login',(req,res,next)=>{
// res.render('login.ejs',{pageTitle:'Student Login',
//     login_page:true,
//     loginAs:'Student'
//     });
// });

// router.get('/Admin_signup',(req,res,next)=>{
//     res.render('Admin_signup.ejs',{pageTitle:'Admin_signup',
//     signup_admin:true,
//     name:'Admin'
//     });
// });
// router.get('/Student_signup',(req,res,next)=>{
//     res.render('Student_signup.ejs',{pageTitle:'Student_signup',
//     signup_admin:true,
//     name:'Student'
//     });
// });



module.exports =  router;