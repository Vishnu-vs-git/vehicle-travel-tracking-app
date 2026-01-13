import express from "express"
import cors from "cors"
import { ErrorHandlingMiddleware } from "./middlewares/errHandlingMiddleware";
import userRoutes from "./routes/user/userRoutes"
const app = express();
app.use(cors())
app.use(express.json())
app.use("/user",userRoutes);
app.use(ErrorHandlingMiddleware.handleError);

export default app;