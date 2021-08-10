import express from "express"
import { edit, logout, seeUser, githubStart, githubFinish } from "../controllers/userController"


const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/logout", logout)
userRouter.get("/github/start", githubStart);
userRouter.get("/github/finish", githubFinish);
userRouter.get("/:id",seeUser);

export default userRouter;