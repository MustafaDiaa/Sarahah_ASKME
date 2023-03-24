import { model, Schema } from "mongoose";

const userScheme = new Schema(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    status: {
      type: String,
      default: "offline",
      enum: ["online", "offline", "blocked"],
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    age: Number,
    phone: String,
    profilePic: String,
    coverPic: [String],
    address: String,
  },
  { timestamps: true }
);

// Connect to mongoose.model.User if its available, OR if not available, create new User with userSchema  mongoose.models.User || model("User", userScheme);
const userModel = model("User", userScheme);

export default userModel;
