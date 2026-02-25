import {Router} from "express";
import { getChatUsers, getConversation, sendMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const messageRouter = Router();

messageRouter.get("/", protect, getChatUsers);
messageRouter.get("/:userId", protect, getConversation);
messageRouter.post("/", protect, sendMessage);

export default messageRouter;