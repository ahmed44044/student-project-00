import Joi from "joi";



export const addCourse= {
    body:Joi.object().required().keys({
        course:Joi.string().required(),
        courseCode:Joi.string().required(),
        courseRequirement:Joi.string(),
        numberOfHoursOfCourse:Joi.number().integer().required(),
        courseStatus:Joi.string().pattern(new RegExp(/^(Compulsory course|Elective Course)$/)).required().messages({
            "string.pattern.base":"plz choice one choice form Compulsory course | Elective Course "
        }),
    })
}



export const updateCourse= {
    body:Joi.object().required().keys({
        course:Joi.string().required(),
        courseCode:Joi.string().required(),
        courseRequirement:Joi.string(),
        numberOfHoursOfCourse:Joi.number().integer().required(),
        courseStatus:Joi.string().pattern(new RegExp(/^(Compulsory course|Elective Course)$/)).required().messages({
            "string.pattern.base":"plz choice one choice form Compulsory course | Elective Course "
        }),
    })
}