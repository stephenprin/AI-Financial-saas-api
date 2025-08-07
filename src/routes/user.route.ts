import { Router } from "express";
import {
  getCurrentUserController,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current-user", getCurrentUserController);
// userRoutes.put(
//   "/update",
//   upload.single("profilePicture"),
//   updateUserController
// );

export default userRoutes;