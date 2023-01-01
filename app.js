require("./connection/index");
require("dotenv").config();
const express = require("express");
const connectDB = require("./connection/index");
const app = express();
const tasks = require("./routes/tasks");

// midleware
app.use(express.json());
app.use(express.static("./public"));

//routes
// app.get('/hello', (req, res) => {
//     res.send('Task Manger!');
// })

app.use("/api/v1/tasks", tasks);

/* 
app.get('/api/v1/tasks') - get all tasks
app.post('/api/v1/task') - post a task
app.get('/api/v1/task/:id') - get a task
app.patch('/api/v1/task/:id') - updateTask
app.delete('/api/v1/task/:id') - delete Task
*/
const port = 3000;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // console.log("Connected to Mongoose DB server");
    app.listen(port, console.log(`server is listening on port ${port} ...`));
  } catch (error) {
    console.log("error:", error);
  }
};

// console.log('Task Manager App')
startApp();
