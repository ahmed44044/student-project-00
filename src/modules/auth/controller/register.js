import userModel from '../../../../DB/model/user.model.js'
// import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {nanoid} from 'nanoid'
import { sendEmail } from '../../../services/email.js'
import { asyncHandler } from '../../../services/errorHandling.js'
import { findById, findOne, findOneAndUpdate, updateOne } from '../../../../DB/DBMethod.js'
import studentAddModel from '../../../../DB/model/StudentAdd.model.js'


export const signup=asyncHandler(async(req,res,next)=>{

    const {userName,NationalID,DepartmentName,level, email, password}=req.body
  
    // const user= await userModel.findOne({email}).select("userName")
    const stu= await findOne({model:studentAddModel,
    filter:{NationalID:NationalID}})
    if (!stu) {
        next(new Error('u Not student plz go to faculty to confirm'))
    } else {
        const user= await findOne({model:userModel,filter:{email},select:'email'})
        if (user) {
           console.log(user);
            // res.status(409).json({message:"Email Exist"})
            next(new Error("Email Exist",{cause:409}))
        } else {
            const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND))
            const newUser= new userModel({userName,email,DepartmentName,level,NationalID,password:hash})
            const token = jwt.sign({id:newUser._id},process.env.EMAILTOKEN,{expiresIn:'1h'})
            const rfToken= jwt.sign({id:newUser._id},process.env.EMAILTOKEN)
            const link=`${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
            const linkRf=`${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/refToken/${rfToken}`
            const message=`
            <a href="${link}">confirmEmail</a> <br><a href="${linkRf}">Re-send confirmation email</a>
            `
            const info=await sendEmail(email,'confirmEmail',message)
            if (info.accepted.length) {
                const savedUser= await newUser.save()
                res.status(201).json({message:"done",savedUserID:savedUser._id})
            } else {
                // res.status(404).json({message:"Email rejected"})
                next(new Error("Email rejected",{cause:400}))
            }
        }
    }
   
})


export const confirmEmail=asyncHandler(async(req,res,next)=>{

    const {token}=req.params
    const decoded= jwt.verify(token,process.env.EMAILTOKEN)
    if (!decoded?.id) {
        // res.status(400).json({message:"In-valid payload"})
        next(new Error("In-valid payload",{cause:400}))
    } else {
        // const user= await userModel.findOneAndUpdate({_id:decoded.id , confirmEmail:false},{confirmEmail:true})
        const user= await findOneAndUpdate({model:userModel,filter:{_id:decoded.id,confirmEmail:false},data:{confirmEmail:true},options:{new:true}})
        // res.status(200).redirect(process.env.FEURL)
         res.status(200).send("confirm,plz login")
        
    }
    

}
)


export const refreshEmail=asyncHandler(async(req,res)=>{

        const {token}=req.params
        const decoded= jwt.verify(token,process.env.emailToken)
        if (!decoded?.id) {
            // res.status(400).json({message:"In-valid token payload"})
            next(new Error("In-valid token payload",{cause:400}))
        } else {
            // const user = await userModel.findById(decoded.id).select('email')
            const user= await findById({model:userModel,filter:{_id:decoded.id},select:'email'})
            if (!user) {
                // res.status(404).json({message:"not register account"})
                next(new Error("not register account",{cause:404}))
            } else {
                if (user.confirmEmail) {
                    // res.status(400).json({message:"Already confirmed"})
                    next(new Error("Already confirmed",{cause:400}))
                } else {
                    const token = jwt.sign({id:user._id},process.env.EMAILTOKEN,{expiresIn:'1h'})
                    const link=`${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
                    const message=`
                    <a href="${link}">confirmEmail</a>
                    `
                    const info=await sendEmail(user.email,'confirmEmail',message)
                    res.status(200).send("Done")
                }
            }
        }
  
})



export const login=asyncHandler(async(req,res,next)=>{

        const {email, password}=req.body
        // const user= await userModel.findOne({email})
        const user= await findOne({model:userModel,filter:{email}})
        if (!user) {
            // res.status(404).json({message:"Email Not Exist"})
            next(new Error("Email Not Exist",{cause:404}))
        } else {
            if (!user.confirmEmail) {
                // res.status(400).json({message:"email not confirmed yet"})
                next(new Error("email not confirmed yet",{cause:400}))
            } else {
                if (user.blocked) {
                    // res.status(400).json({message:"Account blocked"})
                    next(new Error("Account blocked",{cause:400}))
                } else {
                    const match = bcrypt.compareSync(password,user.password)
                    if (!match) {
                        // res.status(400).json({message:"In-valid password"})
                        next(new Error("In-valid password",{cause:400}))
                    } else {
                        const token = jwt.sign({id:user._id,isLoggedIn:true},process.env.TOKENSIGNATURE,{expiresIn:60*60*48})
                        const role= user.role
                        const userName= user.userName
                        res.status(200).json({message:"done",token,role,userName,user})
                    }
                }
            }
          

        }
  
    })



    export const sendCode=asyncHandler(async(req,res)=>{
      
            const {email}= req.body
            // const user= await userModel.findOne({email}).select('email')
            const user= await findOne({model:userModel,filter:{email},select:'email'})
            if (!user) {
                // res.status(404).json({message:"In-valid account"})
                next(new Error("Email Not Exist",{cause:404}))
            } else {
                const code=nanoid()
                const message=`<h1>Access code : ${code}</h1>`
                sendEmail(email,'forget password',message)
                // const updateUser= await userModel.updateOne({_id:user._id},{code})
                const updateUser= await updateOne({model:userModel,filter:{_id:user.id},data:{code}})
                
                if (updateUser.modifiedCount) {
                    res.status(200).json({message:"done "})
                } else {
                    next(new Error("fail",{cause:400}))
                }
              
            }
       
    }
)
    
    export const forgetPassword=asyncHandler(async(req,res)=>{
        const {code,email,newPassword}=req.body
        if (code == null) {
            // res.status(400).json({message:"In-valid code null not accepted"})
            next(new Error("In-valid code null not accepted",{cause:400}))
        } else {
            const hashPassword= bcrypt.hashSync(newPassword,parseInt(process.env.SALTROUND))
            // const user=await userModel.updateOne({email,code},{password:hashPassword,code:null})
            const user= await updateOne({model:userModel,filter:{email,code},data:{password:hashPassword,code:null}})
            if (user.modifiedCount) {
                res.status(200).json({message:"done "})
            } else {
                next(new Error("In-valid code",{cause:400}))
            }
        }
    })