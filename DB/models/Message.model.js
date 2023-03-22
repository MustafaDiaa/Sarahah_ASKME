import { model, Schema, Types } from "mongoose";

const messageScheme = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    receiverID: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Connect to mongoose.model.User if its available, OR if not available, create new User with userSchema
const messageModel = model("Message", messageScheme);

export default messageModel;
