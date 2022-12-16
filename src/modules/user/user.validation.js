import Joi from "joi";

export const updateProfile={
    body:Joi.object().required().keys({
        userName:Joi.string().min(3).max(14).required().messages({
            "string.min":"plz enter userName  must be at least 2 characters long",
            "string.max":"plz enter userName  must be less than or equal to 16",
            'string.base':'lz userName accept string value only',
            "string.empty":'plz fill in u userName',
        }),
       
        
        phone:Joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)).required(),
     
    })
}

export const updatePassword={
    body:Joi.object().required().keys({
        newPassword:Joi.string().pattern(RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
    }).options({allowUnknown:true})
}