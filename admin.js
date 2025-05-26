const { Router } = require('express')
const {z} = require('zod');
const express = require('express')
const { adminmodel, coursemodel } = require('./db');
const adminrouter = Router()
const jwt = require("jsonwebtoken")
adminrouter.use(express.json())
const JWT_ADMIN_SECRET = "hellohello"
const bcrypt = require('bcrypt');
const {auth} = require('./auth');

adminrouter.post("/signup",async function(req,res){
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
        await adminmodel.create({
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
    alert(resonse.data.message)
})

adminrouter.post("/signin",async function(req,res){
    let email = req.body.email;
    let password = req.body.email;

    let founduser = await adminmodel.findOne({
        "email": email
    })
    if(founduser){
        let verification = bcrypt.compare(password,founduser.password)
        if(verification){
        let token = jwt.sign({
            id: founduser._id
        },JWT_ADMIN_SECRET)
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

adminrouter.post("/create-course",auth,async function(req,res){
    let email = req.body.email
    let title = req.body.title
    let description = req.body.description
    let price = req.body.price
    let founduser = await adminmodel.findOne({
        email: email
    })
    let creatorid =await founduser._id
    
    await coursemodel.create({
        creatorid: creatorid,
        title:title,
        description:description,
        price: price
    })

    res.json({
        message:"Course has been added.",
        title:title
    })
})

module.exports = ({
    adminrouter:adminrouter
})