import { create, findById, findByIdAndUpdate, findOne, findOneAndDelete, updateOne } from "../../../../DB/DBMethod.js";
import { materialModel } from "../../../../DB/model/material.model.js";
import userModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../services/errorHandling.js";


export const addCourse= asyncHandler(
    async(req,res,next)=>{
        const student= await findById({
            model:userModel,
            filter:{_id:req.user._id},
            select:'userName email'
        })
        if (student) {
            const {course,courseCode,courseRequirement,numberOfHoursOfCourse,courseStatus}=req.body
            const courses= await findOne({
                model:materialModel,
                filter:{course:course}
            })
            if (!courses) {
                const code= await findOne({
                    model:materialModel,
                    filter:{courseCode:courseCode}
                })
                if (!code) {
                    const addCourse= await create({ 
                        model:materialModel,
                        data:{course,courseCode,courseRequirement,numberOfHoursOfCourse,courseStatus,createdBy:student._id}
                    })
                    addCourse ? res.status(201).json({message:"done",addCourse}) : next(new Error('fail to add courses,sorry'))
                } else {
                    next(new Error('u can not add this course u Already add,sorry or u enter code false'))
                }
            } else {
                next(new Error('u can not add this course u Already add,sorry'))
            }
            
        } else {
            next(new Error('u can not add courses,sorry'))
        }
    }
)













export const updateCourse= asyncHandler(
    async(req,res,next)=>{
        const {id}= req.params
        const {course,courseCode,courseRequirement,numberOfHoursOfCourse,courseStatus} = req.body
        const courses= await findOne({
            model:materialModel,
            filter:{_id:id}
        })
        if (courses.course === course || courses.courseCode === courseCode) {
            next(new Error('u con not add this course or courseCode , it is already Existing'))
        } else {
            const updateCourse= await findByIdAndUpdate({
                model:materialModel,
                filter:{_id:id},
                data:{course,courseCode,courseRequirement,numberOfHoursOfCourse,courseStatus,updatedBy:req.user._id},
                options:{new:true}
            }) 
            updateCourse ? res.status(200).json({message:'done',updateCourse}) : next(new Error('fail to update course'))
        }
    }
)




export const deleteCourse= asyncHandler(
    async(req,res,next)=>{
        const {id}= req.params
        const course= await findOne({
            model:materialModel,
            filter:{_id:id}
        })
        if (course) {
            const deleteCourse= await findOneAndDelete({model:materialModel,
            filter:{_id:id}})
            deleteCourse ? res.status(200).json({message:'done'}) : next(new Error('fail to delete course'))
        }else{
        next(new Error('not found this course'))
        }
    }

)