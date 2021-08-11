import express from "express";
import morgan from "morgan";
import session from "express-session"
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true })); //translate HTML code to JS code(should be before declaring videorouter)

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
)

app.use(localsMiddleware); //after declaring session
app.use("/", rootRouter);
app.use("/uploads", express.static("uploads"))
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;