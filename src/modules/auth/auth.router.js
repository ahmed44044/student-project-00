import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import * as registerController from './controller/register.js'
import * as validators from './auth.validation.js'
const router=Router()

router.get('/',(req,res)=>{
    res.status(200).json({message:"auth Model"})
})

//signup&confirmEmail&refreshToken
router.post('/signup',validation(validators.signup),registerController.signup)
router.get('/confirmEmail/:token',validation(validators.token),registerController.confirmEmail)
router.get('/refToken/:token',registerController.refreshEmail)
//login
router.post('/login',validation(validators.login),registerController.login)
// forgetPassword
router.patch('/sendCode',registerController.sendCode)
router.patch('/forgetPassword',validation(validators.forgetPassword),registerController.forgetPassword)
export default router