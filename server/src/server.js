const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const {connect} = require("./config/connect.config");
const initRoute = require("./routes/initRoute.route");

connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

initRoute(app);


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});