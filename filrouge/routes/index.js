import { Router, json } from "express";
import postsRouter from "./posts";
import { authentificate} from "../middlewares";

const router = Router();
router.use(json());
router.use("/posts",authentificate, postsRouter);

export default router;
