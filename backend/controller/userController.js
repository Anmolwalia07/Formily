import { prisma } from "../db/db.js"
import { loginUserValidation, registerUserValidation } from "../validation/userValidation.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const createUser=async(req,res)=>{
    const result=registerUserValidation(req.body)
    if(result.error){
        return res.status(401).json({message:"Input details are missing"})
    }

    const {name,email,password}=result.data
    try{
        const existUser=await prisma.user.findFirst({
        where:{
            email
        }
    })

    if(existUser){
        return res.status(401).json({message:"User already exists"})
    }

    const hashPassword=await bcrypt.hash(password,10);

    await prisma.user.create({
        data:{
            email,
            name,
            password:hashPassword
        }
    })

    return res.status(200).json({message:"Register Successfully"})
    }catch(err){
     return res.status(401).json({message:"Internal Server error"})
    }
}


export const loginUser=async(req,res)=>{
    const result=loginUserValidation(req.body)
    if(result.error){
        return res.status(401).json({message:"Input details are missing"})
    }

    const {email,password}=result.data

    try{
        const existUser=await prisma.user.findFirst({
        where:{
            email,
        }
    })

    if(!existUser){
        return res.status(401).json({message:"User don't exist"})
    }

    const isMatch=await bcrypt.compare(password,existUser.password)

    if(!isMatch){
        return res.status(401).json({message:"Password not match"})
    }

    const token=await jwt.sign({id:existUser.id},process.env.JWT_SECRET,{expiresIn:'2hr'})
    
    return res.status(200).json({message:"Login Successfully",token})
    }catch(err){
     return res.status(401).json({message:"Internal Server error"})
    }
}


export const giveUserInfo=async(req,res)=>{
    const id=req.userId;
    try{
        const user=await prisma.user.findFirst({
            where:{
                id:id
            }
        })

        return res.status(200).json({user:user})
    }catch(err){
        console.log(err)
        return res.status(401).json({message:"Internal Server error"})
    }
}