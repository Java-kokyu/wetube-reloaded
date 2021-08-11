import express from "express";
import {
  getEdit,
  postEdit,
  getPassword,
  postPassword,
  logout,
  seeUser,
  githubStart,
  githubFinish,
} from "../controllers/userController";
import {
  avatarUpload,
  protectorMiddleware,
  punlicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getPassword)
  .post(postPassword);
userRouter.get("/github/start", punlicOnlyMiddleware, githubStart);
userRouter.get("/github/finish", punlicOnlyMiddleware, githubFinish);
userRouter.get("/:id", seeUser);

export default userRouter;
