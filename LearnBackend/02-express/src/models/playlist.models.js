import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
      {
            name:{
                  type: String,
                  required: true,
                  unique: true,
                  lowercase: true,
                  trime: true,
                  index: true,
            },
            description:{
                  type: String,
                  required: true,
            },
            viedo:[
                  {
                        type: Schema.Types.ObjectId,
                        ref: "Viedo",
                  }
            ],
            owenr:{
                  type: Schema.Types.ObjectId,
                  ref: "User",
            }
      },
      {timestamps: true}
);    


export const playlist = mongoose.model("playlist", playlistSchema);