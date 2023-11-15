import express from "express";

const app =express()


import cors from 'cors'

import cookieParser from "cookie-parser";

// importing routes 
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import productRoute from "./routes/products.js"
// import numberRoute from './routes/number.js'
import dotenv from "dotenv"
import twilio from "twilio"
// import 
dotenv.config()


app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
}))
app.use(cookieParser())

// app.post("")
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
// app.use("/api/verify",numberRoute)

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

// const accountSid = 'AC556fca6cf0f145b0c5227b1bcf0cea80';
// const authToken = 'fa0d4558af5c4155a1c27f7a838cdbac';
// const client = twilio(accountSid, authToken);

// const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: 'hello kiran',
//         from: '+12564826963',
//         to: '+919490330553'
//     })
//     .then(message => console.log(message.sid))

const PORT = process.env.PORT

app.listen(PORT,(req,res)=>{
    console.log('hello server .....................',PORT)
})
