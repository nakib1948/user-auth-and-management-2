import { ZodError, ZodIssue } from "zod"

export const handleZodError = (err:ZodError)=>{
    let errorMessage:string = ""
     err.issues.forEach((issue:ZodIssue)=>{
       errorMessage+=issue.message
    })
    const statusCode = 400
    return {
      statusCode,
      message:'Zod Validation Error',
      errorSources
    }
  }