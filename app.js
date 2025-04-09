const express = require('express')
const bodyParser = require('body-parser')
const mongoose =require('mongoose')
const userRouter = require('./routers/users.router')
const app = express()
app.use(bodyParser.json())

const port = 3301;
const uri = "mongodb+srv://ahmed:ahmed1234@ahmed.dkahxel.mongodb.net/?appName=ahmed";
const connectToDB = async () => {

    try{
        mongoose.set('strictQuery',false)
        mongoose.connect(uri)
        console.log("Connected to MongoDB");
    } catch(err){
        console.log("ConnectedToDB",err)
        process.exit()
    }
  
  
}
connectToDB()

app.use('/' ,userRouter)
app.use(function (req, res) {
    res.status(404).send({  url : req.originalUrl + " Not Found" });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})