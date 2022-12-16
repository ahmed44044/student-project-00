import { asyncHandler } from "../services/errorHandling.js"

const dateMethod=['body', 'params', 'query', 'headers']

export const validation= (Schema)=>{
    return (req,res,next)=>{
        try {
            const validationArr=[]
        dateMethod.forEach(key=>{
            if (Schema[key]) {
                const validationResult= Schema[key].validate(req[key],{abortEarly:false})
                if (validationResult?.error) {
                    validationArr.push(validationResult.error.details)
                }
            }
        })
      
        if (validationArr.length) {
            res.status(400).json({message:"validation error",validationArr})
        } else {
            next()
        } 
        } catch (error) {
            next(new Error("validation err",{cause:500}))
        }
       
    }
}