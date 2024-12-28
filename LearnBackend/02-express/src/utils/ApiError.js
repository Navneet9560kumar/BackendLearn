class ApiError extends error{
      constructor(
            statusCode,
            message = "Something went worng",
            errro= [],
            stack = ""
      ){
            super(message)
            this.data =null
            this.message = message
            this.success = false
            this.errros = errros

            if(stack){
                  this.stack = stack
            }else{
                  Error.captureStackTrace(this,this.constructor)
            }
      }
}

export {ApiError}