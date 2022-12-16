import userModel from "../../../../DB/model/user.model.js"
import bcrypt from 'bcryptjs'
import { find } from "../../../../DB/DBMethod.js"
import { asyncHandler } from "../../../services/errorHandling.js"
import resultModel from "../../../../DB/model/result.model.js"
import { materialModel } from "../../../../DB/model/material.model.js"
export const updateProfile=async(req,res)=>{
    const {userName,phone}=req.body
    const updateUser= await userModel.updateOne({_id:req.user.id},{userName,phone})
    updateUser.modifiedCount? res.json({message:"done"}) : res.json({message:"fail to update profile"})
}

export const updatePassword=async(req,res)=>{
    try {
        const {oldPassword,newPassword}=req.body
        const user= await userModel.findById(req.user.id)
        const match= bcrypt.compareSync(oldPassword,user.password)
        if (!match) {
            res.json({message:"In-valid old password"})
        } else {
            const newHash=  bcrypt.hashSync(newPassword,parseInt(process.env.saltRound))
            const updateUser= await userModel.updateOne({_id:user._id},{password:newHash})
            updateUser.modifiedCount? res.json({message:"done"}) :  res.json({message:"fail to update Password"})
        }
    } catch (error) {
        res.json({message:"catch error", error})
    }
}

export const allStudents=asyncHandler(
async(req,res,next)=>{
    const allStudents= await find({model:userModel,
    filter:{role:'User'},
select:'userName level DepartmentName NationalID'})
allStudents ? res.status(200).json({message:"done",allStudents}) : next(new Error('not found student or u not auth to see all student'))
})

export const studentLevel1=asyncHandler(
    async(req,res,next)=>{
        const allStudent= await find({model:userModel,
        filter:{role:'User', level:'1'},
    select:'userName level DepartmentName NationalID'})
    allStudent ? res.status(200).json({message:"done",allStudent}) : next(new Error('not found student or u not auth to see all student'))
    })

export const studentLevel2=asyncHandler(
    async(req,res,next)=>{
        const allStudent= await find({model:userModel,
        filter:{role:'User', level:'2'},
    select:'userName level DepartmentName NationalID'})
    allStudent ? res.status(200).json({message:"done",allStudent}) : next(new Error('not found student or u not auth to see all student'))
    })

export const studentLevel3=asyncHandler(
    async(req,res,next)=>{
        const allStudent= await find({model:userModel,
        filter:{role:'User', level:'3'},
    select:'userName level DepartmentName NationalID'})
    allStudent ? res.status(200).json({message:"done",allStudent}) : next(new Error('not found student or u not auth to see all student'))
    })

export const studentLevel4=asyncHandler(
    async(req,res,next)=>{
        const allStudent= await find({model:userModel,
        filter:{role:'User', level:'4'},
    select:'userName level DepartmentName NationalID'})
    allStudent ? res.status(200).json({message:"done",allStudent}) : next(new Error('not found student or u not auth to see all student'))
    })

export const students=asyncHandler(
async(req,res,next)=>{
    const {NationalID} =req.body
    const student= await find({model:userModel,
    filter:{NationalID:NationalID,role:'User'},
select:'userName level DepartmentName NationalID'})
student ? res.status(200).json({message:"done",student}) : next(new Error('not found student or u not auth to see student'))
})

export const showResult= asyncHandler(
    async(req,res,next)=>{
     const {id} = req.params
        const result= await find({
            model:resultModel,
            filter:{studentId:req.user._id},
            select:'userName Degree subjectName',
            populate:[
                {
                    path:'studentId',
                    select:'userName level DepartmentName'
                }]
        })
        console.log(req.user._id);
        result.length? res.status(200).json({message:'done',result}) : next(new Error('u con not see u result ,plz go to faculty'))
    }
) 



// export const getAllCourses= asyncHandler(
//     async(req,res,next)=>{
//         const {createdBy}=req.params
//         const allCourse= await find({model:materialModel,
//             filter:{createdBy:createdBy}
           
//     })
//         res.status(200).json({message:"done",allCourse}) 
//     }
// )

export const getAllCourses= asyncHandler(
    async(req,res,next)=>{
        const {id}= req.params
        const allCourse= await find({model:userModel,filter:{_id:id},
            select:'userName DepartmentName level NationalID'
            ,populate:[
            {
                path:'material',
                select:'course numberOfHoursOfCourse courseStatus'
            }
        ]
    })
    

      allCourse.length?  res.status(201).json({message:"done",allCourse}) : next(new Error('u not student or u not register courses ,plz add courses first '))
    }
)