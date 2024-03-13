import { Router } from "express";
import { PostController } from "../controllers";
import { authentificate } from "../middlewares/Authentificate";
const postsRouter = Router();
postsRouter.get("/", PostController.index);
postsRouter.post("/", authentificate, PostController.create);
postsRouter.get("/:post", PostController.show);
postsRouter.delete("/:post", authentificate, PostController.delete);
export default postsRouter;
