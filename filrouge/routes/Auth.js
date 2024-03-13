import { Router } from "express";
import { UserController } from "../controllers";
const AuthRouter = Router();
AuthRouter.post("/login", UserController.login);
AuthRouter.post("/register", UserController.register);
export default AuthRouter;
