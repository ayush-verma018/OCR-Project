import express from "express";
import {
  create,
  deleteUser,
  getAll,
  getOne,
  update,
} from "../controller/userController.js";

const route = express.Router();

//Routes for all the controllers and server calls for doing CRUD operations
route.post("/create", create);
route.get("/getAll", getAll);
route.get("/getOne/:id", getOne);
route.put("/update/:id", update);
route.delete("/deleteUser/:id", deleteUser);
export default route;
