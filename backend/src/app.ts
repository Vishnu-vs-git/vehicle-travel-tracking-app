import express from "express"
import cors from "cors"
import { ErrorHandlingMiddleware } from "./middlewares/errHandlingMiddleware";
import userRoutes from "./routes/user/userRoutes"
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
  origin :"http://localhost:5173",
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRoutes);
app.use(ErrorHandlingMiddleware.handleError);

export default app;