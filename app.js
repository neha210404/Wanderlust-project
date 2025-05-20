if(process.env.NODE_ENV != "production"){
require('dotenv').config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const Listing = require("../models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
//const{listingSchema, reviewSchema}=require("./schema.js");
//const Review = require("./models/review.js");
//session
const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash");


//require routes listing , reviews , user
const listings = require("./routes/listing.js");
const reviews= require("./routes/review.js");
const user= require("./routes/user.js");



const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const dbUrl = process.env.ATLASDB_URL;

//calling moongoose main function
main()
.then(()=>{
 console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
//database
async function main(){
    await mongoose.connect(dbUrl);

}
//ejs setup
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride("_method"));
app.engine("ejs",ejsMate); 
app.use(express.static(path.join(__dirname,"/public")));

//API
// app.get("/",(req ,res)=>{
//     res.send("hi , i am root");

// });
const store =  MongoStore.create({
  mongoUrl : dbUrl,
  crypto : {
    secret : process.env.SECRET,
  },
  touchAfter : 24 * 3600,
});

store.on("error",()=>{
  console.log("error in mongo session store",err);

});

//session
const sessionOption={
  store,
  secret : process.env.SECRET ,
  resave : false,
  saveUninitialized:true
};


app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Pass flash messages to all views (optional, but useful)
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  //console.log(res.locals.success);
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//passport
//app.use(passport.initialize());
//app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//demo user
// app.get("/demouser",async (req, res)=>{
//   let fakeUser = new User({
//     email : " student@gmail.com",
//     username : "delta-student",
//   });
//   let registerdUser =  await User.register(fakeUser,"helloworld");
//   res.send(registerdUser);
// });



//all route access 
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);//post review
app.use("/listings/:id/review",reviews);//delete review
app.use("/",user);




// app.get("/testListing",async (req, res)=>{
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description :"By the beach",
//         price : 1200,
//         location : "Calangute , Goa",
//         country: "India",
//     });
//     //sample listing save

//     await sampleListing.save();
//     console.log("sample was save");
//     res.send("successful testing");

// });


//expresserror throw
//  app.all("*",(req,res,next)=>{
//       next(new ExpressError(404,"page not found"));
//   } );
// // //catch
// // //error handling (middleware) async error handling
  //app.use((err,req,res,next)=>{
//      let {statusCode=500,message="something went wrong"}=err;
//    res.status(statusCode).send(message);
//res.send("something went wrong");
  //});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
}); 