import { Router } from "express";
import {
  logIn,
  logOut,
  signUp,
  verifEmail,
} from "../../controllers/userController.js";

const authRoute = Router();

authRoute.post("/signup", signUp);
authRoute.post("/logout", logOut);
authRoute.post("/login", logIn);
authRoute.post("/signup/verify", verifEmail);

// authRoute.get("/login", createAnd);

// authRoute.get("/logout", createAnd);

export { authRoute };
