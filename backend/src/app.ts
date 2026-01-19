import express from "express"
import cors from "cors"
import { ErrorHandlingMiddleware } from "./middlewares/errHandlingMiddleware";
import userRoutes from "./routes/user/userRoutes"
import cookieParser from "cookie-parser";
import tripRoutes from"./routes/trip/tripRoutes"
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors({
  origin :process.env.FRONT_END_URL,
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRoutes);
app.use("/api/trip",tripRoutes)
app.use(ErrorHandlingMiddleware.handleError);

export default app;