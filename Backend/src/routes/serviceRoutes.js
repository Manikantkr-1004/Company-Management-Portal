import {Router} from "express";
import { createService, getServices } from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const serviceRouter = Router();

serviceRouter.post("/", protect, authorizeRoles("admin"), createService);
serviceRouter.get("/", protect, authorizeRoles("admin", "client"), getServices);

export default serviceRouter;