import express from "express"
import { edit, remove, logout, seeUser } from "../controllers/userController"


const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/logout", logout)
userRouter.get("/:id",seeUser);

export default userRouter;