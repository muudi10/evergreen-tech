const PumpService = require("../services/pumpCost");
const express = require("express");
const router = express.Router();
module.exports = {
  getPumpCost: router.get("/", async (req, res) => {
      console.log(req.query.capacity)
    try {
      const totalCost = await PumpService.calculatePumpCost(
        req.query.capacity
      );
      return res.status(200).send({ data: totalCost });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }),
};
