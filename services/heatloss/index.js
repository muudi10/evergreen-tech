const axios = require("axios");
const baseUrl = "http://localhost:3000";
const { heatLoss } = require("../../helpers/helpers");
module.exports = {
  async calculateloss(req) {
    const { floorArea, heatingFactor, insulationFactor, location } = req;
    try {
      const loss = await heatLoss(floorArea, heatingFactor, insulationFactor);

      const { data } = await axios.get(
        `${baseUrl}/weather?location=${location}`
      );
      const { degreeDays } = data.location;
      const powerLoss = Math.ceil(loss / degreeDays);
      return powerLoss;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  },
};

