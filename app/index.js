"use strict"; 

const cors = require("cors")
const express = require("express");
const app = express();
require("dotenv").config()
const routes = require("./routes/routes");
const morgan = require("morgan");
const logger = require("./utils/logger")(module);


// settings
const port = 5000;
app.set('port', process.env.PORT || port);
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// routes
app.use(routes);


// listen
app.listen(app.get('port'), () => logger.info({level: "info", message: `running on port ${app.get("port")}`}));