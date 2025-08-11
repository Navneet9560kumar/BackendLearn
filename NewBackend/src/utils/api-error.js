class ApiError extends Error{
      constructor(
            StatusCode,
            message = "Something went worng",
            error =[],
            stack=""
      ){
            super(message)
            this.StatusCode = StatusCode
            this.data =null
            this.message = message
            this.success = false
            this.error = error

            if(stack){
                  this.stack = stack
            }else{
                  Error.captureStackTrace(this, this.connstructor)
            }
      }
}


export {ApiError}