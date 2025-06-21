import { Router } from "express";
import {
  forgotPassword,
  logIn,
  logOut,
  restPass,
  signUp,
  verifEmail,
} from "../../controllers/userController.js";

const authRoute = Router();

authRoute.post("/signup", signUp);
authRoute.post("/logout", logOut);
authRoute.post("/login", logIn);
authRoute.post("/forgot", forgotPassword);
authRoute.post("/signup/verify", verifEmail);
authRoute.post("/reset-pass/:token", restPass);

// authRoute.get("/login", createAnd);

// authRoute.get("/logout", createAnd);

export { authRoute };
