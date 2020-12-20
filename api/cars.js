const router = require("express").Router();

const carMiddleware = require("./middleware/cars.middleware");

const {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
} = require("./actions/cars.actions");

router.get("/", carMiddleware, getAllCars);
router.post("/", carMiddleware, createCar);
router.put("/:id", carMiddleware, updateCar);
router.delete("/:id", carMiddleware, deleteCar);

module.exports = router;
