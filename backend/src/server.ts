import app from "./app"

 import { Database } from "./config/database.js"

Database.connect();
app.listen(7000,() => {
   console.log("Server is running on port 5000")
})