const express = require("express");
const server = express();

const carsApi = require("./api/cars");

server.use("/api/cars", carsApi);

module.exports = server;
