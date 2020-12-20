const db = require("../../data/connection");

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
    let transmissionTypes = ["CVT", "Semi-Auto", "Automatic", "Manual"];
    let expectedFields = ["vin", "make", "model", "milage"];

    switch (method) {
      case "PUT":
      case "POST": {
        const condition = !checkExpectedValues(
          expectedFields,
          Object.keys(
            req.body === null || req.body === undefined ? {} : req.body
          )
        );
        if (condition) {
          return res.status(400).json({
            message: "You're missing one or more fields with the request",
          });
        }

        const { transmission_type } = req.body;
        if (transmission_type !== undefined) {
          const checkingType = !checkExpectedValues(transmissionTypes, [
            req.body.transmission_type,
          ]);
          if (checkingType) {
            return res.status(400).json({
              message: "You've entered in the incorrect transmission type.",
            });
          }
        }

        break;
      }

      case "DELETE":
      case "PUT": {
        const { id } = req.params;
        let [foundCar] = await db("cars").where({ id }).select("*");

        if (!foundCar) {
          return res.status(400).json({ message: "The car doesnt exist" });
        }

        break;
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Server error",
    });
  }
  next();
};

module.exports = carMiddleware;
