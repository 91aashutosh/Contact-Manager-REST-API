const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const app = express();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/contacts", require("./routes/contactRoutes")); //middleware
app.use("/api/user", require("./routes/userRoutes")); //middleware
app.use(errorHandler);

connectDB();
// app.use(bodyparser.json());

app.listen(port, function(){
    console.log(`server is running on port ${port}`);
})