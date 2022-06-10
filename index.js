const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

const HouseRouter = require("./routes/weather");
const hearServer = require('./routes/heatLoss')
const HeatPump = require('./routes/heatPumps')
const pumpCost = require('./routes/pupmCost')
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/weather", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/weather', HouseRouter.gethouse);
app.use('/heat', hearServer.calcutateHeatLoose);
app.use('/pumps',HeatPump.getHeatPump)
app.use('/capacity', pumpCost.getPumpCost)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

module.exports = app