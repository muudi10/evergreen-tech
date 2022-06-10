const mongoose = require("mongoose");
const HouseSchema = require("./models/house.schema");
const mockData = require("./mockData");
const heatPumpSchema = require("./models/heatPump.shema");
const heatpumps = require('./heatPump')

const coonecttoDb = mongoose

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

const databaseFill = async () => {
  await heatPumpSchema.insertMany(heatpumps);
};

databaseFill().then(() => {
  mongoose.connection.close();
});
module.exports = coonecttoDb;
