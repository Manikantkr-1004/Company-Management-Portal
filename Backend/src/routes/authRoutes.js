import {Router} from "express";
import { getCsrfToken, getMe, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.get("/me", protect, getMe);
authRouter.get("/csrf-token", getCsrfToken);

export default authRouter;