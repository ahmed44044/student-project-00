import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as userController from './controller/user.js'
import { endPoint } from "./user.endPoint.js";
import * as validators from './user.validation.js'
const router=Router()

router.get('/allStudent',auth(endPoint.admin),userController.allStudents)
router.get('/studentLevel1',auth(endPoint.admin),userController.studentLevel1)
router.get('/studentLevel2',auth(endPoint.admin),userController.studentLevel2)
router.get('/studentLevel3',auth(endPoint.admin),userController.studentLevel3)
router.get('/studentLevel4',auth(endPoint.admin),userController.studentLevel4)
router.get('/student',auth(endPoint.admin),userController.students)
router.get('/allCourses/:id',auth(endPoint.profile),userController.getAllCourses)
router.put('/update',validation(validators.updateProfile),auth(endPoint.profile),userController.updateProfile)
router.patch('/updatePassword',validation(validators.updatePassword),auth(endPoint.profile),userController.updatePassword)


router.get('/result',auth(endPoint.profile),userController.showResult)
export default router