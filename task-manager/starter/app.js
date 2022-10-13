const express = require("express");
const app = express();
const tasks = require("./routes/tasks"); //import tasks routers
const connectDB = require("./db/connect"); //import connectDB config
require("dotenv").config(); //import .env

//middleware
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks); //use tasks routers

// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get a single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks:id')   - delete task

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
