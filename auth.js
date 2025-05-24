const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
app.use(express.json())
const JWT_USER_SECRET = require('./config')

function auth(req,res,next){
    let token = localStorage.getItem("token")
    let token_verify = jwt.verify(token,JWT_USER_SECRET)
    if(!token_verify){
        return res.status(403).json({
            message: "You are not logged in."
        })
    }else{
        req.body.userid = token_verify.id
        next()
    }
}

module.exports = ({
    auth: auth
})