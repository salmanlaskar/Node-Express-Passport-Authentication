var express=require('express');
var router=express.Router();


router.get('/dummy',isLoggedIn,function(req,res){
    res.render('profile');
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
        console.log(req.session);
        var min = 60000;
        req.session.cookie.expires = new Date(Date.now() + min);
        //req.session.cookie.maxAge = hour;
        console.log(req.session);
        return next();
    }
    res.redirect('/login')
}
module.exports=router;