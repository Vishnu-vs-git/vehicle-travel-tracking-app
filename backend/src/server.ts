import dotenv from "dotenv";
import app from "./app"
import { Database } from "./config/database";
dotenv.config();



Database.connect();
app.listen(process.env.PORT,() => {
   console.log("Server is running on port 5000")
})