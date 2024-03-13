import { Router } from "express";
import { CommentController } from "../controllers";
import { authentificate } from "../middlewares/Authentificate";
const commentRouter = Router();
commentRouter.post("/", authentificate, CommentController.create);
commentRouter.delete("/:post", authentificate, CommentController.delete);
commentRouter.patch("/:post", authentificate, CommentController.like);
export default commentRouter;
