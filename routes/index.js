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




    //===============================
    //Login routes

    router.get('/login',function(req,res){
        res.render('login');
    });

    router.post("/login",passport.authenticate("local",
    {
        successRedirect : '/login',
        failureRedirect : '/signup'
    }),function(req,res){                 
    });


  module.exports =router;