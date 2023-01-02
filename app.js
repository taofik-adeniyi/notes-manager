require("dotenv").config();
const express = require("express");
const connectDB = require("./connection/index");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error");
// midleware
app.use(express.json());
app.use(express.static("./public"));

//routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
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
