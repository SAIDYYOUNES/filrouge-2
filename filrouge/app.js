import express from "express";
import "express-async-errors"
import "./config";
import { handleErrors } from "./middlewares";
const App = express();
App.use(handleErrors);
export default App;

