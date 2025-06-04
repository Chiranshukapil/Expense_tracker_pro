import express from "express";
import register from "./controllers/register.js";
import login from "./controllers/login.js";
import userDashboard from "./controllers/userDashboard.js";
import auth from "../../middlewares/auth.js";
import forgotPassword from "./controllers/forgotPassword.js";
import resetPassword from "./controllers/resetPassword.js";
const userRoutes = express.Router();

//Routes
userRoutes.post("/register",register);
userRoutes.post("/login",login);
userRoutes.post("/forgotPassword",forgotPassword)
userRoutes.post("/resetPassword", resetPassword)


userRoutes.use(auth)

//Protected routes
userRoutes.get("/dashboard",userDashboard);


export default userRoutes;