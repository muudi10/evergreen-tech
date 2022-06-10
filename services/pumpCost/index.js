const HeatpumpSchema = require("../../models/heatPump.shema");
const { totalCost } = require("../../helpers/helpers");

module.exports = {
  async calculatePumpCost(capacity) {
    try {
      const pumpCost = await HeatpumpSchema.findOne({
        outputCapacity: capacity,
      });
      if (!pumpCost) {
        return "please provide correct pump capacity";
      } else if (pumpCost) {
        const total = totalCost(pumpCost.costs)

        return {
          breakDown: pumpCost,
          subtotal: total,
          ["vat rate"]: 5,
          total: (total*1.05),
        };

      }
    } catch (error) {}
  },
};
