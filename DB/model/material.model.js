
import { Schema ,model ,Types } from "mongoose";

export const materialSchema= new Schema({
    course:{
        type:String,
        require:true,
        unique:[true, 'email is unique']
    },
    courseCode:{
        type:String,
        require:true,
        unique:[true, 'email is unique']
    },
    courseRequirement:{
        type:String,
        require:true
    },
    numberOfHoursOfCourse:{
        type:String,
        require:true
    },
    courseStatus:{
        type:String,
        default:"Compulsory course",
        require:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        require:true
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
        require:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

export const materialModel=model('material',materialSchema)