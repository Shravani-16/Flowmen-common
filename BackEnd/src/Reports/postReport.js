const postDowntimeReport = require("./utils/postDowntimeReport");
const postProductionReport = require("./utils/postProductionReport");
const postQuality = require("./utils/postQuality");
const postPlantReport = require("./utils/postPlantReport");
const { fetchData } = require("../calculations/Calculation");
const postEnergyData = require("./utils/postEnergyData");

const getTimeUntilEndOfDay = () => {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    return endOfDay - now;
};

const postReport = async () => {
    const PLCData = await fetchData('https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getPLC/data/PLC/');
    let shiftStatus = PLCData?.ShiftS;
    const { noCavity } = await fetchData('https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getShiftaata/data/Shift/');

    let ProdCount = PLCData?.Prodcount * noCavity;
    
    if (shiftStatus === 1) {
        postProductionReport({ ProdCount });
    }

    // Schedule the plant report to be posted at the end of the day
    const timeUntilEndOfDay = getTimeUntilEndOfDay();
    setTimeout(() => {
        postPlantReport();
        postEnergyData();
    }, timeUntilEndOfDay);
};

module.exports = postReport;
