import { Router, json } from "express";
import postsRouter from "./posts";
import AuthRouter from "./Auth";
import commentRouter from "./comments";
import {authentificate} from "../middlewares";
import { route } from "express/lib/router";
import adminRouter from "./admin";
import { Admin } from "../middlewares/Admin";
import { uploadHandler,uploadMiddleware } from "../middlewares";

const router = Router();
router.use(json());
router.use("/posts", postsRouter);
router.use("/Auth", AuthRouter);
router.use("/comments",commentRouter );
router.use('/admin',authentificate,Admin,adminRouter);
router.use("/upload", uploadMiddleware.single("image"), uploadHandler);

export default router;
