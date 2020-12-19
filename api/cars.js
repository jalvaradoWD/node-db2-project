const router = require("express").Router();

const { getAllCars } = require("./actions/cars.actions");

router.get("/", getAllCars);

module.exports = router;
