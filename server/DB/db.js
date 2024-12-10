import mongoose from "mongoose"

const ConnectDB =()=>{
    
try {
    mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log("MongoDB connected successfully")
} catch (error) {
    console.log("mongodb error",error)
}
}

export default ConnectDB