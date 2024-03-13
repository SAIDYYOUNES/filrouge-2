import { Router, json } from "express";
import postsRouter from "./posts";
import AuthRouter from "./Auth";
import commentRouter from "./comments";
import {authentificate} from "../middlewares";
import { route } from "express/lib/router";
import adminRouter from "./admin";
import { Admin } from "../middlewares/Admin";

const router = Router();
router.use(json());
router.use("/posts",authentificate, postsRouter);
router.use("/Auth", AuthRouter);
router.use("/comments",authentificate,commentRouter );
router.use('/admin',authentificate,Admin,adminRouter);

export default router;
