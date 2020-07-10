var express           =require('express');
var router            =express.Router();
var passport          =require('passport'),    
    User              =require('../models/user');
    



    //===============================================
    //      SignUp Routes

    router.post('/signup',function(req,res){
        
       User.register(new User({username : req.body.username}),req.body.password,function(err,user){
           if(err)
           {
               console.log(err);
               return res.render('signup');
           }
           passport.authenticate("local")(req,res,function(){
               req.logOut();
               res.redirect('/login');
           });
       });
    });

    router.get('/signup',function(req,res){
             res.render('signup');
    });


  module.exports =router;