import mongoose, { Schema } from "mongoose";

const subscribedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // The user who subscribes
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: true, // The channel being subscribed to
    },
    notificationPreference: {
      type: String,
      enum: ["all", "personalized", "none"],
      default: "all", // User's notification preference
    },
  },
  { timestamps: true }
);

export const Subscribed = mongoose.model("Subscribed", subscribedSchema);
