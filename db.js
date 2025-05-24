const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

// first we have to define the schema

const user = new Schema({
    "email": {type:String, unique:true},
    "name": String,
    "password": String,
})
const admin = new Schema({
    "email": {type:String, unique:true},
    "name": String,
    "password": String,
})

const course = new Schema({
    "title": String,
    "description":String,
    "price": Number,
    "creatorid": ObjectId
})

const purchases = new Schema({
    "courseid": ObjectId,
    "userid": ObjectId
})

const usermodel = mongoose.model("users",user)
const adminmodel = mongoose.model("admins",admin)
const coursemodel = mongoose.model("courses",course)
const purchasemodel = mongoose.model("purchases",purchases)

module.exports = ({
    usermodel: usermodel,
    coursemodel:coursemodel,
    adminmodel:adminmodel,
    purchasemodel:purchasemodel
})