"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const controller_index = require("./controllers/index");
const morgan = require("morgan");
const config = require("./config/config");
const App = express();

const main = () => {
    App.set("port", config.APP_PORT);
    App.use(cors());
    App.use(bodyParser.json());
    App.use(morgan("dev"));
    App.use("/api/v1/facturacion", controller_index);

    App.listen(App.get("port"));
    console.log("API waiting connections at " + App.get("port") + " port");
};

main();