import { Router } from "express";
import { PostController } from "../controllers";
import { authentificate } from "../middlewares/Authentificate";
const postsRouter = Router();
postsRouter.get("/", PostController.index);
postsRouter.post("/", authentificate, PostController.create);

export default postsRouter;
