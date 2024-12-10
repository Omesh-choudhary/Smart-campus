   import jwt from "jsonwebtoken"
   import User from "../models/user.model.js"

   const tokenMiddleware = async (req,res,next)=>{
    const token = req.header("Authorization")

    if(!token){
        res.status(401).json({msg:"Unauthorized http ,token not provided"})
    }

    const jwtToken = await token.replace("Bearer","").trim()
   
    
    

     try {
         
        const IsVerified  =   jwt.verify(jwtToken,process.env.JWT_SECRET)
        console.log(IsVerified)
       
        
        const UserData = await User.findOne({email:IsVerified.email}).select({password:0})
    console.log(UserData)
       

        req.user=UserData;
        req.token=token;
       

        next()
     } catch (error) {
        console.log(error);
        
        return res.status(401).json({msg:"Invalid token"})
     }
  }

  export default tokenMiddleware