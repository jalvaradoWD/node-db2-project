const db = require("../../data/connection");

const getAllCars = async (req, res) => {
  return res.json(await db("cars").select("*"));
};

const createCar = async (req, res) => {
  /**
   * Fields requried
   *  vin
   *  make
   *  model
   *  milage
   *  transmission_type - OPTIONAL
   *    - Choices [CVT, Semi-Auto, ]
   */

  let createdCar = req.body;

  await db("cars").insert(createdCar);

  return res.json(createdCar);
};

const updateCar = async (req, res) => {
  /**
   * Fields requried
   *  vin
   *  make
   *  model
   *  milage
   *  transmission_type - OPTIONAL
   *    - Choices [CVT, Semi-Auto, ]
   */
  const { id } = req.params;
  const { transmission_type: type } = req.body;

  let updatedCarInfo = {
    ...req.body,
    transmission_type: type ? type : null,
  };

  await db("cars").where({ id }).update(updatedCarInfo);
  return res.status(200).json(updatedCarInfo);
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  await db("cars").where({ id }).del();

  return res.status(200).json({
    message: "Car Deleted",
  });
};

module.exports = { getAllCars, createCar, updateCar, deleteCar };
