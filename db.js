const mongoose = require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017"

mongoose.set("strictQuery", false);

const connectToMongo=()=>{
    mongoose.connect(mongoURI ,()=>{
console.log("Mongo Connected")
    })
}
module.exports =connectToMongo;

