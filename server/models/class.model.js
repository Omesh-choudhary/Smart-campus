import mongoose from "mongoose"

let ClassSchema = mongoose.Schema({
    Subject:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    StartTime:{
        type:String,
        required:true
    },
    EndTime:{
        type:String,
        required:true
    }
})

let Class = mongoose.model("Class",ClassSchema)

export default Class