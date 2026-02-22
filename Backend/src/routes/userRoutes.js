import {Router} from "express";
import { createUser, deleteUser, getAllUsers, getDashboardStats, updateUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const userRouter = Router();

userRouter.post("/", protect, authorizeRoles("admin"), createUser);
userRouter.get("/", protect, authorizeRoles("admin"), getAllUsers);
userRouter.put("/:id", protect, authorizeRoles("admin","client","employee"), updateUser);
userRouter.delete("/:id", protect, authorizeRoles("admin"), deleteUser);
userRouter.get("/stats", protect, authorizeRoles('admin','client','employee'), getDashboardStats);

export default userRouter;