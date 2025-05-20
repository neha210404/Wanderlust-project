const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controller/listings.js");
const multer  = require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({ storage });

// create index  route
router.get("/",
    validateListing,
      wrapAsync(listingController.index));

    // New Route = Create new listing
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show route
   router.get("/:id",wrapAsync(listingController.showListing)
  ) ;

   //create form detail submit route
router.post("/",isLoggedIn,
   upload.single("image"),
   validateListing,
  wrapAsync (listingController.createListing)
  );    

 
//Edit  route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync (listingController.renderEditForm));

// Update route
router.put("/:id", isLoggedIn, isOwner,
  upload.single("image"),
    validateListing,
    wrapAsync(listingController.updateListing));

//Delete route
router.delete("/:id",isLoggedIn, isOwner,wrapAsync(listingController.deletedListing));

module.exports= router;