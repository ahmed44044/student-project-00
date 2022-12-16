import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";

import endPoint from "./admin.endPoint.js";
import * as adminController from './controller/admin.js'
import * as validators from './admin.validation.js'
const router=Router()
router.post('/signupAdmin',validation(validators.signupAdmin),adminController.signupAdmin)
router.post('/AddStudent',validation(validators.addStudentNationalID),auth(endPoint.add),adminController.addStudentNationalID)
router.post('/addResult/:studentID',auth(endPoint.add),adminController.addResult)
export default router