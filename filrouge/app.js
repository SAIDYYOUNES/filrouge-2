import express from "express";
import "express-async-errors"
import "./config";
import router from "./routes";
import { handleErrors } from "./middlewares";
import cors from "cors";
const App = express();
App.use(express.static('public'))
App.use(cors());
App.use(router);
App.use(handleErrors);
export default App;

