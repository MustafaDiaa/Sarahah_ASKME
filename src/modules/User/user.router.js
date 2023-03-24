import Router from "express";
import * as userController from "./controller/user.js";
import auth from "./../../middleware/auth.middleware.js";
import validation from "./../../middleware/validation.js";
import * as validators from "./user.validation.js";
import { fileUpload, fileValidation } from "./../../utils/multer.js";

const router = Router();

router.patch(
  "/profilePic",
  fileUpload("user/profile/profilePic", fileValidation.image).single("image"),
  auth,
  userController.profilePic
);
router.patch(
  "/coverPic",
  fileUpload("user/profile/coverPic", fileValidation.image).array("image", 5),
  auth,
  userController.coverPic
);
router.get("/profile", auth, userController.profile);
router.get(
  "/:id/profile",
  validation(validators.shareProfile),
  userController.shareProfile
);
router.patch(
  "/password",
  validation(validators.updatePassword),
  auth,
  userController.updatePassword
);

export default router;
