var express = require('express');
var router = require("./routes/users");

//Create a instance of express.
var app = express();

//json middleware.
app.use(express.json());

//routes middleware.
app.use("/users",router);
app.use("/users",router);
app.use("/users",router);
app.use("/users",router);
app.use("/users",router);



app.listen(3001,() => console.log("Server Start"));

module.exports = app;
