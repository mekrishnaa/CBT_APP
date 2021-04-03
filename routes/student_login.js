const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');
const User = require("../api/models/students");
const { check, validationResult} = require("express-validator");

router.get('/',(req,res,next)=>{
    res.render('login.ejs',{pageTitle:req.body.title});
});

router.get('/student_login',(req,res,next)=>{
    
    res.render('login.ejs',{pageTitle:'Student Login',
        login_page:true,
        loginAs:'Student'
    });
});


router.get('/Student_signup',(req,res,next)=>{
    res.render('Student_signup.ejs',{pageTitle:'Student_signup',
    signup_admin:false,
    name:'Student'
    });
});

// router.post('/Student',(req,res,next)=>{
//     const name = req.body.username;
//     console.log(name);
//    res.render('Student.ejs',{
//         pageTitle:'Student',
//         name:name,
//         main_page:true

//     });
// });

router.post('/Student',
    [
        check('psw').isLength({min:6}),
       
    ],
   async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({error:errors.array()});
        }

        const {username,userId,email,psw,psw_repeat} = req.body;
        try{
            let user  = await User.findOne({userId});
            if(user){
            return res.status(400).json({error:'user already Exists'});
            }
            user = new User({username,userId,email,psw});
            user.save().then(result=>{
                console.log('data save successfully',result);
                res.render('Student.ejs',{
                    pageTitle:'Admin Login',
                    name:username,
                    main_page:true
                });
            })
            .catch(err=>{
                console.log('error while saving data');
                res.status(404).json({error:err});
            });
        }
        catch{
            console.log('error while saving');
        }

    }


);


router.post('/Student_login',
    [
        check('username').not().isEmpty(),
        check('id').not().isEmpty(),
        check('password').isLength({
                min:6
            }),
    ],
    async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
              errors: errors.array()
            });
        }
        const {username,id,password} = req.body;
        const userId = id;
        
        try{
            let user = await User.findOne({
                userId
            });
            if(!user){
                return res.status(400).json({
                    message:"user not exists"
                });
            }
            
            const isMatch=await (user.psw) == password;
            if(!isMatch)
            return res.status(400).json({
                message:"Incorrect Password!"
            });
            res.render('Student.ejs',{
                pageTitle:'Admin Login',
                name:username,
                main_page:true
            });
                
        }
        catch{
            console.log('server Error');
        }
    }

);

module.exports = router;