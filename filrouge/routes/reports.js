import { Router } from "express";
import { ReportController } from "../controllers";
import { authentificate } from "../middlewares/Authentificate";
const reportRouter = Router();
reportRouter.post("/:id", ReportController.create);
reportRouter.get("/", ReportController.index);
reportRouter.patch("/:id", ReportController.markRead);
export default reportRouter;
