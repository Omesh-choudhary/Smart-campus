import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./DB/db.js"
import Router from "./routes/user.routes.js"
import ClassRouter from "./routes/class.route.js"
dotenv.config({
    path:"./.env"
})
let PORT=process.env.PORT
const app = express()
app.use(express.json())
app.use("/api/user",Router)
app.use("/api/data",ClassRouter)

app.get("/",function(req,res){
res.send("hello")
})

app.listen(PORT,()=>{
    ConnectDB()
    console.log("server is running")
})