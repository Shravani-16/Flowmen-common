const mongoose = require('mongoose');

const SoilDataSchema = new mongoose.Schema({
    sensorId: { type: String, required: false },
    timestamp: { type: Date, required: true, default: Date.now },
    // Individual metric fields
    moisture: { type: Number, required: false },
    pH: { type: Number, required: false },
    temp: { type: Number, required: false },
    // Nutrient/other metrics (percent or unit as agreed)
    phosphorus: { type: Number, required: false },
    sulfur: { type: Number, required: false },
    zinc: { type: Number, required: false },
    iron: { type: Number, required: false },
    manganese: { type: Number, required: false },
    copper: { type: Number, required: false },
    potassium: { type: Number, required: false },
    calcium: { type: Number, required: false },
    magnesium: { type: Number, required: false },
    sodium: { type: Number, required: false }
}, { timestamps: true });

module.exports = mongoose.model('SoilData', SoilDataSchema);
