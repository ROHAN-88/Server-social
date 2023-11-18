import express from "express";

import { isUser } from "../Authication/authication.js";
import { EditUser, login, register, userData } from "./user.service.js";

const routes = express.Router();

//!====================Register Routes============================
routes.post("/register", register);

//!==============login Routes=========================
routes.post("/login", login);

//!===========userData================================
routes.get("/getuserdetail", isUser, userData);

//!=============Edit User Data ===================
routes.put("/EditProfile/:id", isUser, EditUser);

export default routes;
