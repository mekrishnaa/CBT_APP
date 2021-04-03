const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

const alert = require('alert');

//const { check, validationResult} = require("express-validator/check");
const { check, validationResult} = require("express-validator");

const User = require("../api/models/adminUsers");

router.get('/',(req,res,next)=>{
    res.render('login.ejs',{pageTitle:req.body.title});
});

router.get('/admin_login',(req,res,next)=>{
    //console.log('into the admin login page in router get');
    res.render('login.ejs',{pageTitle:'Admin Login',
    login_page:true,
    loginAs:'Admin'
    });
});

router.get('/Admin_signup',(req,res,next)=>{
    res.render('Admin_signup.ejs',{pageTitle:'Admin_signup',
    signup_admin:true,
    name:'Admin'
    });
});


// router.post('/Admin',(req,res,next)=>{
//     const name = req.body.username;
//     console.log(name);
//    res.render('Admin.ejs',{
//         pageTitle:'Admin Login',
//         name:name,
//         main_page:true
//     });
// });

router.post('/Admin',
    [
        check('psw').isLength({min:6}),
       
    ],
   async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({error:errors.array()});
        }

        const {username,Instructor_ID,email,psw,psw_repeat} = req.body;
        try{
            let user  = await User.findOne({Instructor_ID});
            if(user){
            return res.status(400).json({error:'user already Exists'});
            }
            user = new User({username,Instructor_ID,email,psw});
            user.save().then(result=>{
                console.log('data save successfully',result);
                res.render('Admin.ejs',{
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






// router.post('/Admin',
//         [
            // check('username').not().isEmpty(),
            // check('Instructor_ID').not().isEmpty(),
            // check('email').isEmail(),
            // check('psw').isLength({
            //     min:6
            // }),
//             check('psw_repeat').isLength({
//                 min:6
//             })
            
//         ],
//         async(req,res)=>{
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 console.log('in error is empty');
//                 return res.status(400).json({
//                     errors: errors.array()
//                 });
//             }

//             const {
//                 username,
//                 Instructor_ID,
//                 email,
//                 psw,
//                 psw_repeat,
                
//             } = req.body;
            
//             try {
//                 let user = await User.findOne({
//                     email,
//                 });
//                 if (user) {
//                     // return res.status(400).json({
//                     //     msg: "User Already Exists"
//                     // });
//                     alert('User already Exists');
//                     //prompt('User already exists');
              
//                 }
    
//                 user = new User({
//                     username,
//                     Instructor_ID,  
//                     email,
//                     psw
//                 });
//                 await user.save().then(res=>{

//                     alert('User save successfully');
//                     console.log("User saved successfully", user);
//                     // res.render('login.ejs',{pageTitle:'Admin Login',
//                     // login_page:true,
//                     // loginAs:'Admin'
//                     // });
//                     res.redirect('login.ejs');
//                 })
//                 .catch(err=>{
//                     console.log(err);
//                     return res.status(400).json({
//                         error:err
//                     });
//                 });
//             }
//             catch (err) {
//                 console.log(err.message);
//                // alert('Error while saving information');
//                 res.status(500).json({error:err});
//             }




//         }
// );

router.post('/Admin_login',
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
        const Instructor_ID = id;
        
        try{
            let user = await User.findOne({
                Instructor_ID
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
            res.render('Admin.ejs',{
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

router.get('/upload',(req,res,next)=>{
    res.render('upload_paper.ejs',{
        pageTitle:'Upload Paper'
    });
});


module.exports = router;