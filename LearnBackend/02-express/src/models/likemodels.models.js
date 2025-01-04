import mongoose, { Schema } from "mongoose";



const likeSchema = new Schema(
      {
            Viedo :{
                  type: Schema.Types.ObjectId,
                  ref: "Viedo",
            },
            Comment:{
                  type: Schema.Types.ObjectId,
                  ref: "Comment",
            },
            tweet:{
                  type: Schema.Types.ObjectId,
                  ref: "Tweet",
            },
            likeBy:{
                  type: Schema.Types.ObjectId,
                  ref: "User",
            }
      }
      {timestamps: true}
)


export const like = mongoose.model("like", likeSchema);