import {Router} from "express";
import { createServiceRequest, getServiceRequests, updateServiceRequest } from "../controllers/serviceRequestController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const serviceRequestRouter = Router();

serviceRequestRouter.post("/", protect, authorizeRoles("client"), createServiceRequest);
serviceRequestRouter.get("/", protect, authorizeRoles("admin", "client"), getServiceRequests);
serviceRequestRouter.put("/:id", protect, authorizeRoles("admin"), updateServiceRequest);

export default serviceRequestRouter;