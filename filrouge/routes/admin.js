import  { Router } from "express";
import { AdminController } from "../controllers";
 const adminRouter = Router();
adminRouter.get("/users", AdminController.index);
adminRouter.post("/banne/:id", AdminController.banne);
export default adminRouter;