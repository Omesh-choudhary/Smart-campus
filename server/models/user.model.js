import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

let UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Course:{
        type:String
    },
    CollegeName:{
        type:String
    },
    PhoneNo:{
        type:Number
    }
   
},{timestamps:true})



UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        id:this._id,
        email:this.email
    },
    process.env.JWT_SECRET,
    { expiresIn:"24h"}
)
    
}

UserSchema.pre("save", async function(next){

    if(!this.isModified("password")){
     return next()
    }
  
   try {
      let salt =  bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(this.password, salt);
      this.password = hash
   } catch (error) {
      console.log(error)
   }
  })


UserSchema.methods.IspasswordCorrect = function (password){
  
 return   bcrypt.compare(password,this.password)
}

let User = mongoose.model("User",UserSchema)

export default User