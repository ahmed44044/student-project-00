import { Schema , model,Types } from "mongoose";


const resultSchema=  new  Schema({

    Degree:{
        type:Number,
        required:true,
        max:100
    },
    subjectName:{
        type:String,
        required:true,
        unique:true
    },
    studentId:{
        type:Types.ObjectId,
        ref:'User'
    }

},
{
    timestamps:true
})

const resultModel= model('result',resultSchema)
export default  resultModel  