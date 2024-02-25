const express = require("express");
const usersRouter = require("./routes/usersRouter");
const connectDB = require("./utils/connectDB");
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

//---------Router------
app.use("/api/v1/users", usersRouter);

//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
