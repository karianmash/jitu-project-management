import { Router } from "express";
import { createProject, deleteProject, getProjects, updateProject } from "../Controller/projectsController";

const router = Router();

router.post("/create", createProject);
router.get("/getProjects", getProjects);
router.post("/deleteProject", deleteProject);
router.put("/updateProject", updateProject);

export default router;
