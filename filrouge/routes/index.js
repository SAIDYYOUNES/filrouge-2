import { Router, json } from "express";
import postsRouter from "./posts";
import AuthRouter from "./Auth";
import {authentificate} from "../middlewares";
import { route } from "express/lib/router";

const router = Router();
router.use(json());
router.use("/posts",authentificate, postsRouter);
router.use("/Auth", AuthRouter);
router.use("/comments",authentificate,commentRouter );

export default router;
