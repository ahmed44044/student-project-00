import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as courseController from './controller/addCourse.js'
import { endPoint } from "./course.endPoint.js";
import * as validators from './course.validation.js'
const router=Router()

router.post('/addCourses',auth(endPoint.addCourse),courseController.addCourse)
router.put('/updateCourses/:id',auth(endPoint.addCourse),courseController.updateCourse)
router.delete('/deleteCourses/:id',auth(endPoint.Forgiveness),courseController.deleteCourse)

export default router