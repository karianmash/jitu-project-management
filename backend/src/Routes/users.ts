import { Router } from "express";
import { createUser, getUsers, loginUser } from "../Controller/usersController";


const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/getUsers", getUsers);

export default router;
