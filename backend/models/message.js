import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatUsers: {
      type: Array,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    Sender: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

const messageModal = mongoose.model("message", messageSchema);
export default messageModal;
