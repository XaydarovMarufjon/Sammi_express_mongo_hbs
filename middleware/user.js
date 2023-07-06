import  jwt  from "jsonwebtoken";
import User from "../models/User.js";

export default async function (req, res , next){
   if(!req.cookies.token) {
     res.redirect('/login')
   }

   const token = req.cookies.token ; // tokenni olamiz
   const decoded  = jwt.verify(token , process.env.JWT_SECRET) // tokendan userni id sini ajratib olamiz
   const user = await User.findById(decoded.userId) // id ni ajratib olish 
   req.userId  = user._id  // sorovga  userIdni qo'shib yuboramiza
  
   next()
}



