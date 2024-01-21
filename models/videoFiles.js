import mongoose from "mongoose";

const videoFileSchema = new mongoose.Schema(
  {
    videoTitle: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    videoChannel: {
      type: String,
      required: true,
    },
    Like: {
      type: Number,
      default: 0,
    },
    Views: {
      type: Number,
      default: 0,
    },
    Uploder: {
      type: String,
    },
    visibility: {
      type: String, // Assuming visibility is a string field (public, private, etc.)
      required: true,
      default: 'public', // You can set a default value if needed
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("VideoFiles",videoFileSchema);


