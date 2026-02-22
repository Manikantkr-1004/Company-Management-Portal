import {Router} from "express";
import { assignEmployees, getProjects, updateProjectStatus } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const projectRouter = Router();

projectRouter.get("/", protect, getProjects);
projectRouter.put("/:id/assign", protect, authorizeRoles("admin"), assignEmployees);
projectRouter.put("/:id/status", protect, authorizeRoles("employee"), updateProjectStatus);

export default projectRouter;