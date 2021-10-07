import { Router } from "express";
import { validRegister } from "./handlers/validRegister";
import authHandlers from "./handlers/authHandlers";

const authRouter = Router();
authRouter.post("/register", validRegister, authHandlers.register);
authRouter.post("/activate", authHandlers.activate);
authRouter.post("/login", authHandlers.login);
authRouter.get("/logout", authHandlers.logout);
authRouter.get("/refresh_token", authHandlers.refreshToken);

export default authRouter;
