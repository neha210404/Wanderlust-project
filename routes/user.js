const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");
//sign up route

router.get("/signup",userController.renderSignupForm);

router.post("/signup",wrapAsync(userController.signUp));

//login route
router.get("/login",userController.renderLoginForm);

router.post("/login", saveRedirectUrl,passport.authenticate("local",{
   failureRedirect : "/login",
   failureFlash : true,
}),
userController.login );

//logout route
router.get("/logout",userController.logout);

module.exports = router;