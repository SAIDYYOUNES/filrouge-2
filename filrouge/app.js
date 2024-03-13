import express from "express";
import "express-async-errors"
import "./config";
import router from "./routes";
import { handleErrors } from "./middlewares";
const App = express();
App.use(router);
App.use(handleErrors);
export default App;

