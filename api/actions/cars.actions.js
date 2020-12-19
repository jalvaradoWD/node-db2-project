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
   *
   */

  const { transmission_type: type } = req.body;

  const transmissionTypes = ["CVT", "Semi-Auto", "Automatic", "Manual"];

  if (transmissionTypes.includes(type)) {
    return res
      .status(400)
      .json({ message: "You've entered in the incorrect transmission type." });
  }
  let createdCar = {
    ...req.body,
    transmission_type: type ? type : null,
  };

  await db("cars").insert(createCar);

  return res.json(createdCar);
};

module.exports = { getAllCars };
