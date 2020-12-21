let transmissionTypes = ["CVT", "Semi-Auto", "Automatic", "Manual"];
let expectedFields = ["vin", "make", "model", "milage"];
let statusOfVehicle = [
  "Salvage",
  "Junk",
  "Bonded",
  "Reconstructed",
  "Affidavit",
  "Rebuilt",
  "Certificate of destruction",
  "Parts only title",
  "Electronic",
  "Lienholder",
  "Import",
];

module.exports = { transmissionTypes, expectedFields, statusOfVehicle };
