"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const controller_index = require("./controllers/index");
const morgan = require("morgan");
const config = require("./config/config");
const expressJwt = require("express-jwt");
const App = express();

const MysqlConnection = require("./config/MysqlConnection");

const main = () => {
    App.set("port", config.APP_PORT);
    App.use(cors());
    App.use(bodyParser.json());
    App.use(morgan("dev"));
    //App.use(expressJwt({ secret: config.JWT_SECRET }).unless({ path:["/public/auth"] }));
    App.use("/api/v1/facturacion", controller_index);

    App.listen(App.get("port"));
    console.log("API waiting connections at " + App.get("port") + " port");
};

new MysqlConnection().connect().then(() => {
    console.log("Mysql is online");
    main();
}).catch(err => { console.log(err.message); });