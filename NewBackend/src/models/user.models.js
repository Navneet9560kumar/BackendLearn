import mongoose ,{Schema} from "mongoose"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema  = new Schema(
      {
            avatar: {
                  type:{
                        url:String,
                        lacalPath:String,
                  },
                  default:{
                        url: `https://placehold.co/200X200`,
                        location: ""
                  }
            },
            username: {
                  type:String,
                  required:true,
                  unique:true,
                  lowercase:true,
                  trim:true,
                  index:true
            },
            email:{
                  type:String,
                  required:true,
                  unique:true,
                  trim:true

            },
            fullName:{
                  type:String,
                  trim:true
            }, password:{
                  type:String,
                  required: [true, "Password is requred"]
            }, 
            isEmailverified: {
                  type:Boolean,
                  default:false,

            },
            refreshToken:{
                  type:String
            },
            frogotpasswordToken:{
                  type: String

            }, 
            frogotpasswordExpiry:{
                  type:Date
            },
            emailVerificationExpiry:{
                  type:date
            }
      },{
            timestamps: true,
      },
);



userSchema.pre("save", async function (next) {

      if(!this.isModified("password")) return next()

      this.password = await bcrypt.hash(this.password, 10)
      next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
      return await bcrypt.compare(password, this.password)
}

//ab generated r token 
userSchema.method.generateAccessToken = function(){
      jwt.sign(
            {
                  _id:this._id,
                  email:this.email,
                  username:this.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
      )
}


userSchema.method.generateRefreshToken = 
function(){
      return jwt.sign(
            {
                  _id:this._id,
                  email:this.email,
                  username:this.username
            },
            process.env.REFRESH_TOKEN_SEVRET,
            {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
      )
};

userSchema.method.generateTemporaryToken = function(){
      const unHashedToken = crypto.randomBytes(20).toString("hex")

      const hashedToken = crypto
            .createHash("sha256")
            .update(unHashedToken)
            .digest("hex")


      const tokenExpiry =Date.now() + (20*6*1000)
      return {unHashedToken, hashedToken, tokenExpiry}

}
export const User = mongoose.model("User", userSchema)
