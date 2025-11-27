const mongoose = require("mongoose");

const FinalDataSchema = new mongoose.Schema({
    availability: {
        type: Number,
        required: true, 
    },
    performance: {
        type: Number,
        required: true,
    },
    quality: {
        type: Number,
        required: true,
    },
    oEE: {
        type: Number,
        required: true,
    },
    productionVolume: {
        type: Number,
        required: true,
    },
    machinesInProduction: {
        type: Number,
        required: true,
    },
    expectedProduction: {
        type: Number,
        required: true,
    },
    actualProduction: {
        type: Number,
        required: true,
    },
    goodProduction: {
        type: Number,
        required: true,
    },
    rejectedProduction: {
        type: Number,
        required: true,
    },
    operatorBreak: {
        type: Number,
        required: true,
    },
    operatorUnavailable: {
        type: Number,
        required: true,
    },
    materialUnavailable: {
        type: Number,
        required: true,
    },
    waitingOnInception: {
        type: Number,
        required: true,
    },
    machineIssues: {
        type: Number,
        required: true,
    },
    Downtime: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("FinalData", FinalDataSchema);
