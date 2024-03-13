import { Router } from "express";
import { UserController } from "../controllers";
const AuthRouter = Router();
AuthRouter.post("/login", UserController.login);
export default AuthRouter;
