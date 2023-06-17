import * as dotenv from "dotenv";
dotenv.config();
import authRouter from "./modules/Auth/Auth.router.js";
import messageRouter from "./modules/Message/Message.router.js";
import userRouter from "./modules/User/User.router.js";

const initApp = (app, express) => {
  app.use(express.json());

  /////////////////////////

  app.get("/", (req, res) => {
    return res.send("hello...!");
  });
  app.use("/auth", authRouter);
  app.use("/messages", messageRouter);
  app.use("/users", userRouter);
  app.use("/*", (req, res) => res.json({ message: "404 page not found" }));
};

export default initApp;
