import mongoose, { Schema } from "mongoose";

const messageModel = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
    file: {
      type: String, // URL or file path for the uploaded file
    },
    fileType: {
      type: String, // Could store file type like 'image' or 'pdf'
    },
  },
  { timestamps: true }
);
export const Message = mongoose.model("Message", messageModel);
