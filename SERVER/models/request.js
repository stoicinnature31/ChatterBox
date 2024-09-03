import mongoose from 'mongoose'
const { Schema, Types, model, models } = mongoose;

const schema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

   
    sender: { type: Types.ObjectId, ref: "User", required: true },
    receiver: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const Request = models.Request || model("Request", schema);
