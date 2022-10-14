const express = require("express");
const app = express();
const tasks = require("./routes/tasks"); //import tasks routers
const connectDB = require("./db/connect"); //import connectDB config
require("dotenv").config(); //import .env
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.static("./public")); //import static files in public folder
app.use(express.json());

//routes

app.use("/api/v1/tasks", tasks); //use tasks routers
app.use(notFound); //for non-existent routes
app.use(errorHandlerMiddleware);

const port = 3000;

//server wont start if connection to database fails
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(
        `This server is listening on port ${port}...\nVisit http://localhost:${port} to access`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();
