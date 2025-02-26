// const { Schema } = require("mongoose");
const mongoose=require("mongoose")
const todos= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true,
    }
})
const Todo=mongoose.model("Todo",todos)
module.exports=Todo