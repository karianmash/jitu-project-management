import { Router } from "express";
import { createProject } from "../Controller/projectsController";

const router = Router();

router.post("/create", createProject);
// router.post("/assign", assignProject);
// router.post("/delete", getAllProjects);

export default router;
