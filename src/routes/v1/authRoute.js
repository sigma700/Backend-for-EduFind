import { Router } from "express";
import {
  checkAuth,
  forgotPassword,
  logIn,
  logOut,
  restPass,
  signUp,
  verifEmail,
} from "../../controllers/userController.js";
import { checkIsLogged } from "../../../middleware/checkToken.js";

const authRoute = Router();

authRoute.post("/signup", signUp);
authRoute.post("/logout", logOut);
authRoute.post("/login", logIn);
authRoute.post("/forgot", forgotPassword);
authRoute.post("/signup/verify", verifEmail);
authRoute.post("/reset-pass/:token", restPass);
authRoute.get("/check-auth", checkIsLogged, checkAuth);

export { authRoute };
