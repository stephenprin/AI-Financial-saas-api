import { Router } from "express";
import {
  loginController,
//   loginController,
  registerController,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);

export default authRoutes;