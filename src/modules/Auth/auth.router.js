import Router from "express";
import * as authController from "./controller/auth.js";
import { asyncHandler } from "./../../utils/errorHandling.js";
import validation from "./../../middleware/validation.js";
import * as validators from "./auth.validation.js";

const router = Router();

router.get("/", authController.getAuthModule);
router.post("/signup", validation(validators.signup), authController.signup);
router.get("/confirmEmail/:token", authController.confirmEmail);
router.get("/newConfirmEmail/:token", authController.newConfirmEmail);
router.post("/login", validation(validators.login), authController.login);

export default router;
