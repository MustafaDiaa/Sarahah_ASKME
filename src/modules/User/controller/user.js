import userModel from "./../../../../DB/models/User.model.js";
import { hash, compare } from "./../../../utils/hashAndCompare.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";

export const profile = async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  return res.json({ message: "User Module", user });
};

export const profilePic = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new Error("File is required", { cause: 400 }));
  }

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      profilePic: req.file.dest,
    },
    { new: true }
  );

  return res.json({ message: "Done", user });
});

export const coverPic = asyncHandler(async (req, res, next) => {
  if (!req.files?.length) {
    return next(new Error("File is required", { cause: 400 }));
  }

  const coverPic = [];
  for (const file of req.files) {
    coverPic.push(file.dest);
  }
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      coverPic,
    },
    { new: true }
  );

  return res.json({ message: "Done", user });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const user = await userModel.findById(req.user._id);
  const match = compare({ plaintext: oldPassword, hashValue: user.password });

  if (!match) return next(new Error("Invalid old password", { cause: 400 }));

  const hashPassword = hash({ plaintext: newPassword });
  user.password = hashPassword;
  await user.save();

  return res.status(200).json({ message: "Done" });
});

export const shareProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel
    .findById(req.params.id)
    .select("username email profilePic firstName lastName");

  return user
    ? res.status(200).json({ message: "Done", user })
    : next(new Error("Invalid ID", { cause: 404 }));
});
