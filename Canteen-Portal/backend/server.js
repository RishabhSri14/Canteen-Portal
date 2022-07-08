const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "FoodServices"

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb+srv://RishabhSri:Sujitsudha1@cluster0.gibrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var VendorRouter = require("./routes/Vendors");
// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/vendor", VendorRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
