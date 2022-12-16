import { Schema , model,Types } from "mongoose";
import { roles } from "../../src/middleware/auth.js";

const userSchema=  new  Schema({
    userName:{
        type:String,
        required:[true, 'userName is required'],
        min:[2,'minium length 2 char'],
        min:[20,'max length 20 char'],
    },
    email:{
        type:String,
        unique:[true, 'email is unique'],
        required:[true, 'email is required'],
      
    },
    NationalID:{
        type:String,
        require:true,
        unique:true
    },
    level:{
        type:String,
        require:true
    },
    DepartmentName:{
        type:String,
        require:true
    },
    age:Number,
    password:{
        type:String,
        required:[true, 'password is required'],
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        default:'User',
        enum:[roles.Admin,roles.User]
    },

    confirmEmail:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default:false
    },
   
    isDeleted:{
        type:Boolean,
        default:false
    },
    code:{
        type:String,
        default:null
    },
    lastSeen:{
        type: Date,
         default: Date.now
    },
    image:String,
 
   

},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
userSchema.virtual('material',{
    ref:'material',
    localField:'_id',
    foreignField:'createdBy'
})

const userModel= model('User',userSchema)
export default  userModel  