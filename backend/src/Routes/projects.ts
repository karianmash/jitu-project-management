import { Router } from "express";
import { createProject, deleteProject, getProjects } from "../Controller/projectsController";

const router = Router();

router.post("/create", createProject);
router.get("/getProjects", getProjects);
router.post("/deleteProject", deleteProject);

export default router;
