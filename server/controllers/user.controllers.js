import User from "../models/user.model.js"
import Class from "../models/class.model.js"

const registration = async(req,res)=>{
 
    const {username,email,password,Course,CollegeName,PhoneNo} = req.body
    console.log(username)

    let ExistUser = await User.findOne({email})

    if(ExistUser){
        res.status(401).json({msg:"User Already registered"})
    }

 

  try {
    let CreatedUser = await User.create({
        username,
        email,
        password,
        Course,
        CollegeName,
        PhoneNo
    })
     res.status(201).json({
        token:await CreatedUser.generateAuthToken(),
        user:CreatedUser
     })
  } catch (error) {
    console.log(error)
    res.status(501).json({msg:"Internal server error"})
    
  }
}

const login = async(req,res)=>{

    const {email,password}=req.body
    try {
        let existUSER = await User.findOne({email})
       
        
        
        if(existUSER){
          let isPasswordCorrect = await existUSER.IspasswordCorrect(password)
    
        if(isPasswordCorrect){
          res.status(201).json({
             message:"login successfully",
             token:await existUSER.generateAuthToken(),
             userId:existUSER._id.toString()
          })
        }
        else{
          res.status(401).json({message:"Invalid credentials"})
          
        }
        }
        else{
          res.status(401).json({message:"Invalid credentials"})
        }
    
        
       } catch (error) {
          console.error(error)
       }

}

const UserData = async(req,res,next)=>{
  
    try {
       const UserData = req.user
       console.log(UserData)
       
       res.status(201).json({UserData})
    } catch (error) {
       console.error(`error from user route ${error}`)
    }
 
 }

 const ClassData =async ()=>{

    let AllClasses = await Class

 }
export {registration,login, UserData}