class ApiResponse{
      constructor(satusCode, data, message = "Sussess"){
            this.satusCode = satusCode
            this.data= data
            this.message= message
            this.success = satusCode<400
      }
}
 

export {ApiResponse};