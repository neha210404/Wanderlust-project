const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// basic mongo db connection code
main()
.then(()=>{
 console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
//database
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")

}

// function to initialise db
const initDB = async ()=>{
    //first we clean our database by deleting privious models
    await Listing.deleteMany ({});
   initData.data= initData.data.map(obj => ({ ...obj, owner:new mongoose.Types.ObjectId("6826d41e9cf1e8aee96e04f6") }))
  .filter(obj => obj.title);
   //map((obj)=>[{...obj,owner : "6826d41e9cf1e8aee96e04f6"}])
    await Listing.insertMany (initData.data);
    console.log("data was initialize");
};

initDB ();

