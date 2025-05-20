const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title :{
        type: String,
        required:true,
    },
    description: {
        type :String,
    },
    image: {
       url : String,
       filename : String,
    },
    price:{
        type :Number,
    },
    location:{
        type:String,
    },
    country :{

    type: String,
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
        
    ],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",

    }

});


//if we delete listing we want to delete review also from DB so here we doing
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
         await Review.deleteMany({_id : {$in:listing.reviews}});
    }
   
});


//creating model
const listing = mongoose.model("listing",listingSchema);
module.exports =listing;