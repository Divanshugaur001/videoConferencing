import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";

const register= async(req,res)=>{
     const {name,username,password}=req.body;
     try{
        const existingUser=  await User.findOne({username});
        if(existingUser){
           return res.status(httpStatus.FOUND).json({message:"user already exists"});
        }
        const hashPassword= await bcrypt.hash(password,10);
        const newuser= new User({
            name:name,
            username:username,
            password:hashPassword,
                });
        await newuser.save();
        res.status(httpStatus.CREATED).json({message:"user register sucessfully"})
     }
     catch(e){
        res.json({message:`something want wrong ${e}`});
     }
}

const login = async(req,res)=>{
const {username,password}= req.body;

if(!username||!password){
   return res.status(400).json({message:"pls provide something"});
}

try{
   const user = await User.findOne({username});
   if(!user){
      res.status(httpStatus.NOT_FOUND).json({message:'user not found'});
   }
   const isMatch= await bcrypt.compare(password,user.password);
   
    if (!isMatch) {
      return res.status(401).json({ message: "WRONG PASSWORD" });
    }
      let token=crypto.randomBytes(20).toString("hex");

      user.token=token;
       await user.save();
       return res.status(httpStatus.OK).json({token:token});
   

}catch(e){
   return res.status(500).json({message:`something went wrong ${e}`})
}

}

export {register,login};