const path = require("../utils/path");

const controller = {};

controller.root = (req, res) => res.json({message: "welcome to API REST SCHOOL", status: res.statusCode});



module.exports = controller;