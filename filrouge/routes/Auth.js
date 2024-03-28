import { Router } from "express";
import { UserController } from "../controllers";
import { authentificate } from "../middlewares";
const AuthRouter = Router();
AuthRouter.post("/login", UserController.login);
AuthRouter.post("/register", UserController.register);
AuthRouter.post("/savePost/:id",authentificate, UserController.savePost);
AuthRouter.get("/savedPosts",authentificate, UserController.saveDposts);
export default AuthRouter;
