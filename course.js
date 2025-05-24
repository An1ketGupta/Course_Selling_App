const {Router} = require('express')
const express = require('express')
const app = express()
const {auth} = require('./auth')
const courseRouter = Router();
const {usermodel, coursemodel} = require('./db')
courseRouter.use(express.json())

courseRouter.get("/preview",auth, async function(req,res){
    let email = req.body.email

    let founduser =await usermodel.findOne({
        email: email
    })
    let id = founduser._id
    let courses = await coursemodel.find({
        userid:id
    })
    res.json(courses)
})

module.exports = ({
    courseRouter:courseRouter 
})