import express from "express";
import {login,logout,myProfile,register} from "../controller/userController.js";
import {isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

//Login request
router.post("/login",login);
//logout request
router.get("/logout",isAuthenticated,logout);
//myProfile route
router.get("/me",isAuthenticated,myProfile);
//register route
router.post("/register",register);

export default router;
