import jwt from 'jsonwebtoken'
import { findById } from '../../DB/DBMethod.js';
import userModel from '../../DB/model/user.model.js';
import { asyncHandler } from '../services/errorHandling.js';
export const roles={
    Admin:"Admin",
    User:"User"
}
export const auth= (accessRoles=[])=>{
    return asyncHandler(async(req,res,next)=>{
       
            // console.log({bb:req.body});
            const {authorization}=req.headers
            // console.log({authorization});
            if (!authorization?.startsWith(process.env.BEARERKEY)) {
                // res.status(400).json({ message: "In-valid Bearer key"})
                next(new Error('In-valid Bearer key,{cause:400'))
            } else {
                const token= authorization.split(process.env.BEARERKEY)[1]
                const decoded= jwt.verify(token,process.env.TOKENSIGNATURE)
                if (!decoded?.id || !decoded?.isLoggedIn) {
                    // res.status(400).json({ message: "In-valid token payload"})
                    next(new Error('In-valid token payload',{cause:400}))
                } else {
                    // const user= await userModel.findById(decoded.id).select('email role userName')
                    const user= await findById({model:userModel,filter:decoded.id,select:'email role userName blocked'})
                    if (!user) {
                        // res.status(404).json({ message: "Not register user"})
                        next(new Error('Not register user',{cause:401}))
                    } else {
                        if (user.blocked) {
                            // res.status(400).json({message:"Account blocked"})
                            next(new Error("Account blocked",{cause:400}))
                        } else {
                            if (!accessRoles.includes(user.role)) {
                                next(new Error('Not Auth User',{cause:403}))
                            } else {
                                req.user=user
                            next()
                            }
                        }
                        
                        
                    }
                }
            }
       
    })
}