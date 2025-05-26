// this is the node js file 

const express = require('express')
const app = express()   // creating a instance for the backend server
const {userRouter} = require('./user')
const {courseRouter} = require('./course')
const {adminrouter} = require('./admin')
const mongoose = require('mongoose')
const {MONGO_URL} = require('./config')
const cors = require('cors')
app.use(cors())
app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use("/admin",adminrouter)

async function main(){
    await mongoose.connect(MONGO_URL)
    app.listen(3000)
}

main()