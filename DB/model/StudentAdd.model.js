import { Schema , model,Types } from "mongoose";

const studentAddSchema= new Schema({
    NationalID:{
        type:String,
        require:true,
        unique:true
    }
},{
    timestamps:true
})

const studentAddModel = model('studentAdd',studentAddSchema)
export default studentAddModel