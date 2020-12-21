const db = require("../../data/connection");
const {
  transmissionTypes,
  statusOfVehicle,
  expectedFields,
} = require("./choices");

const checkExpectedValues = (expectedValues, givenValues) => {
  if (givenValues.length === 0) {
    return false;
  }

  let missingValue;

  for (let i = 0; i < expectedValues.length; i++) {
    if (expectedValues.includes(givenValues[i])) {
      missingValue = true;
    }
  }

  if (missingValue) {
    return true;
  } else {
    return false;
  }
};

const carMiddleware = async (req, res, next) => {
  const { method } = req;
  try {
    switch (method) {
      case "PUT":
      case "POST": {
        const { transmission_type, status_of_the_title } = req.body;

        // Checks to see if all requried fields from the request have been met

        if (
          !checkExpectedValues(
            expectedFields,
            Object.keys(
              req.body === null || req.body === undefined ? {} : req.body
            )
          )
        ) {
          return res.status(400).json({
            message: "You're missing one or more fields with the request",
          });
        }

        // Checks if a given transmission type from the request is in one of the option within the array of "transmissionTypes"
        if (transmission_type !== undefined) {
          if (
            !checkExpectedValues(transmissionTypes, [
              req.body.transmission_type,
            ])
          ) {
            return res.status(400).json({
              message: "You've entered in the incorrect transmission type.",
            });
          }
        }

        // Checks if a given transmission type from the request is in one of the option within the array of "statusOfVehicle"
        if (status_of_the_title !== undefined) {
          if (
            !checkExpectedValues(statusOfVehicle, [
              req.body.status_of_the_title,
            ])
          ) {
            return res.status(400).json({
              message:
                "You've entered in the incorrect status of the title type.",
            });
          }
        }
        break;
      }

      case "DELETE":
      case "PUT": {
        const { id } = req.params;
        let [foundCar] = await db("cars").select("*").where({ id });

        if (!foundCar) {
          return res.status(400).json({ message: "The car doesnt exist" });
        }

        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errorMessage: "Server error",
    });
  }
  next();
};

module.exports = carMiddleware;
