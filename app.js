var exp               =require('express'),
    parser            =require('body-parser'), 
    mongoose          =require('mongoose'),
    passport          =require('passport'),
    LocalStratergy    =require('passport-local'),
    indexRoutes       =require('./routes/index'),
    homeRoutes       =require('./routes/home'),
    User              =require('./models/user');
  mongoose.connect('mongodb://localhost:27017/Auth',{ useNewUrlParser: true },function(err){
      if(err)
        console.log(err)
           else{
           console.log("Database connected");
           }
  });

var app=exp();
app.set('view engine','ejs');


//==============================================
//middleware initializations
app.use(parser.urlencoded({extended:true}));

        //Authentication Configuration//
//=======================================
app.use(require('express-session')({
    secret : 'kkfjdgudgsclzxhoasjcauf',
    resave : true,
    saveUninitialized : true,
    rolling: true,
    cookie:{maxAge:60000}
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//==========================================
//Middleware config

app.use(function(req,res,next){
    res.locals.user = req.user;
    console.log(req.user);
     next();
    });

//routes
app.use(indexRoutes);
app.use(homeRoutes);

//=======================================
app.listen(12000,function()
{
    console.log('Server Started');
});
//====================================