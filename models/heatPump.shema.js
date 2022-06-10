const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heatPumpSchema = new Schema({
    label: 'string',
    outputCapacity: 'number',
    costs: [{
        label: 'string',
        cost: 'number'
    }]
});

module.exports = mongoose.model('heatPump', heatPumpSchema);