import {Router} from "express";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const userRouter = Router();

userRouter.post("/", protect, authorizeRoles("admin"), createUser);
userRouter.get("/", protect, authorizeRoles("admin"), getAllUsers);
userRouter.put("/:id", protect, authorizeRoles("admin","client","employee"), updateUser);
userRouter.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

export default userRouter;