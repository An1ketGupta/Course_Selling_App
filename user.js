const { Router } = require('express')
const userRouter = Router();
const express = require('express')
userRouter.use(express.json())
const {z} = require('zod')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const {usermodel, coursemodel} = require('./db')
const {purchasemodel} = require("./db")
const {auth} = require('./auth')
const JWT_USER_SECRET = "hellohello"

userRouter.post("/signup",async function(req,res){
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.email;
    
    let requiredbody = z.object({
        name:z.string().min(3).max(30),
        password:z.string().min(3).max(30),
        email:z.string().min(6)
    })
    const parsedinfo = requiredbody.safeParse(req.body)
    if(!parsedinfo.success){
        res.status(403).json({
            message: parsedinfo.error
        })
    }
    let hash = await bcrypt.hash(password,5)
    try
    {
        await usermodel.create({
            name: name,
            email: email,
            password: hash,
        })
    }
    catch(e){
        res.status(403).json({
            message: "This email is already registered."
        })
    }
    res.json({
        message: "You are signed up."
    })
    
})

userRouter.post("/signin",async function(req,res){
    let email = req.body.email;
    let password = req.body.email;

    let founduser = await usermodel.findOne({
        "email": email
    })
    if(founduser){
        console.log("User Found.")
        let verification = bcrypt.compare(password,founduser.password)
        if(verification){
            let token = jwt.sign({
                id: founduser._id
                },JWT_USER_SECRET)
            res.json({
                token: token,
                message: "Done"
            })
        }
        else{
            res.json({
                message: "Wrong password."
            })
        }
        }
    else{
        res.json({
            message:"Invalid Email."
        })
    }
    
})

userRouter.post("/purchase",auth,async function(req,res){
    let email = req.body.email
    let title = req.body.title
    let founduser = await usermodel.findOne({
        email:email
    })
    let foundcourse = await coursemodel.findOne({
        title: title
    })
    await purchasemodel.create({
        "courseid":foundcourse._id,
        "userid":founduser._id
    })

    res.json({
        message: "Your purchase has been completed.", 
        title:req.body.title
    })
})

module.exports = ({
    userRouter: userRouter
})