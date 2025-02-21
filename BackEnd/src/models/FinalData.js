import mongoose  from "mongoose";

const FinalDataSchema = new mongoose.Schema({
    availability: {
        type: Number,
        require: true
    },
    performance: {
        type: Number,
        require: true
    },
    quality: {
        type: Number,
        require: true
    },
    oEE:{
        type: Number,
        require: true
    },
    productionVolume: {
        type: Number,
        require: true
    },
    machinesInProduction:{
        type: Number,
        require: true
    },
    expectedProduction: {
        type: Number,
        require: true
    },
    actualProduction:{
        type: Number,
        require: true
    },
    goodProduction:{
        type: Number,
        require: true
    },
    rejectedProduction: {
        type: Number,
        require: true
    },
    operatorBreak:{
        type: Number,
        require: true
    },
    operatorUnavailable:{
        type: Number,
        require: true
    },
    materialUnavailable:{
        type: Number,
        require: true
    },
    waitingOnInception:{
        type: Number,
        require: true
    },
    machineIssues:{
        type: Number,
        require: true
    },
    Downtime:{
        type: Number,
        require: true
    },
})

const FinalData = mongoose.model('FinalData', FinalDataSchema);

export default FinalData;