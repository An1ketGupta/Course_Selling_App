// this is the node js file 

const express = require('express')
const app = express()   // creating a instance for the backend server
const {userRouter} = require('./user')
const {courseRouter} = require('./course')
const {adminrouter} = require('./admin')
const mongoose = require('mongoose')

app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use("/admin",adminrouter)

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
}