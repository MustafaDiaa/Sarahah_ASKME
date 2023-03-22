import authRouter from "./modules/Auth/auth.router.js";
import userRouter from "./modules/User/user.router.js";
import messageRouter from "./modules/Message/message.router.js";
import connectDB from "./../DB/connection.js";
import { globalErrorHandling } from "./utils/errorHandling.js";

const initApp = (app, express) => {
  // convert buffer data
  app.use(express.json({}));

  // App Routing
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);

  app.all("*", (req, res, next) => {
    return res.json({ message: "Invalid routing" });
  });

  // Error handling middleware
  // it catches any error as a parameter
  // whether u typed it in first line or last line, its always in the end of the stack
  app.use(globalErrorHandling);

  // Connection DB
  connectDB();
};

export default initApp;
