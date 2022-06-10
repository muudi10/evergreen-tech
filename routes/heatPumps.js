const PumpService = require("../services/heatPump/");
const express = require("express");
const router = express.Router();
module.exports = {
  getHeatPump: router.get("/", async (req, res) => {
    try {
      const heatPumps = await PumpService.heatPump(req.body.heatloss);
      return res.status(200).send({ data: heatPumps });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }),
};
