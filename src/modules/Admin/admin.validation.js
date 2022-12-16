import Joi from "joi";

export const addStudentNationalID={
    body:Joi.object().required().keys({
      
        NationalID:Joi.string().pattern(new RegExp(/(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/)).required(),
 
    })
}


export const signupAdmin={
    body:Joi.object().required().keys({
        userName:Joi.string().min(2).max(20).required().messages({
            'any.required':"userName field is required",
            "string.min":"plz enter userName  must be at least 2 characters long",
            "string.max":"plz enter userName  must be less than or equal to 20",
            'string.base':'plz userName accept string value only',
            "string.empty":'plz fill in u userName',
        }),
        email:Joi.string().email().required().messages({
            'any.required':'plz send u email',
            'string.empty':'plz fill in u email',
            'string.email':'plz enter valid email',
            'string.base':'plz email accept string value only'
        }),
        age:Joi.number().integer().min(18).max(23).required(),
        NationalID:Joi.string().pattern(new RegExp(/(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/)).required(),
        password:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword:Joi.string().valid(Joi.ref('password')).required()
    })
}
