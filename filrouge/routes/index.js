import { Router, json } from "express";
import postsRouter from "./posts";
import AuthRouter from "./Auth";
import {authentificate} from "../middlewares";

const router = Router();
router.use(json());
router.use("/posts",authentificate, postsRouter);
router.use("/Auth", AuthRouter);

export default router;
