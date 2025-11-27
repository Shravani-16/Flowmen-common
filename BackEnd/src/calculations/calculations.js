const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

// Function to calculate machine availability
const macAvail = async (request, response) => {
    try {
        const { operationTime, plannedOperation, deviceId, sessionId } = request.body;

        if (!operationTime || !plannedOperation || !deviceId || !sessionId) {
            throw new Error("operationTime, plannedOperation, deviceId, and sessionId are required.");
        }

        const availability = operationTime / plannedOperation;
        response.json({ result: availability, deviceId, sessionId });
    } catch (error) {
        console.log("Error:", error);
        response.status(400).json({ error: error.message });
    }
};

// Function to calculate machine performance
const macPerf = async (request, response) => {
    try {
        const { idealCycleTime, actualCycleTime, deviceId, sessionId } = request.body;

        if (!idealCycleTime || !actualCycleTime || !deviceId || !sessionId) {
            throw new Error("Invalid request body. Required fields: idealCycleTime, actualCycleTime, deviceId, and sessionId.");
        }

        const machinePerformance = idealCycleTime / actualCycleTime;
        response.json({ result: machinePerformance, deviceId, sessionId });
    } catch (error) {
        console.error("Error:", error);
        response.status(400).json({ error: error.message });
    }
};

// Function to calculate production quality
const proQual = async (request, response) => {
    try {
        const { goodParts, totalPartsProduced } = request.body;

        if (goodParts === undefined || totalPartsProduced === undefined) {
            throw new Error("Both goodParts and totalPartsProduced are required.");
        }

        const quality = goodParts / totalPartsProduced;
        response.json({ result: quality });
    } catch (error) {
        console.log("Error:", error);
        response.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to calculate Overall Equipment Effectiveness (OEE)
const macOEE = async (request, response) => {
    try {
        const { machineAvailability, machinePerformance, productionQuality, deviceId, sessionId } = request.body;

        if (!machineAvailability || !machinePerformance || !productionQuality || !deviceId || !sessionId) {
            throw new Error("All fields (machineAvailability, machinePerformance, productionQuality, deviceId, and sessionId) are required.");
        }

        const oee = (machineAvailability * machinePerformance * productionQuality) / 100;
        response.json({ result: oee, deviceId, sessionId });
    } catch (error) {
        console.log("Error:", error);
        response.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to calculate cycle time
const cycleTime = async (request, response) => {
    try {
        const { operatingTime, noOfCycles } = request.body;

        if (!operatingTime || !noOfCycles) {
            throw new Error("Both operatingTime and noOfCycles are required.");
        }

        const cycleTime = operatingTime / noOfCycles;
        response.json({ result: cycleTime });
    } catch (error) {
        console.log("Error:", error);
        response.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to calculate downtime
const downTime = async (request, response) => {
    try {
        const { plannedOperatingTime, machineOperatingTime } = request.body;

        if (!plannedOperatingTime || !machineOperatingTime) {
            throw new Error("Both plannedOperatingTime and machineOperatingTime are required.");
        }

        const downtime = plannedOperatingTime - machineOperatingTime;
        response.json({ result: downtime });
    } catch (error) {
        console.log("Error:", error);
        response.status(500).json({ error: "Internal Server Error." });
    }
};

// Function to generate total production report
const totalProductionReport = async (request, response) => {
    try {
        const data = request.body;
        response.json({ result: data });
    } catch (error) {
        console.log("Error:", error);
        response.status(500).json({ error: "Internal Server Error." });
    }
};

/*
Example JSON structure for totalProductionReport:
{
    "ExpectedProduction": 97602,
    "ActualProduction": 92557,
    "GoodProduction": 88675,
    "RejectedProduction": 3882
}
*/

// Exporting all functions (CommonJS)
module.exports = {
    macAvail,
    macPerf,
    proQual,
    macOEE,
    cycleTime,
    downTime,
    totalProductionReport
};
