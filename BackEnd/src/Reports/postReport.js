import postDowntimeReport from "./utils/postDowntimeReport.js";
import postProductionReport from "./utils/postProductionReport.js";
import postQuality from "./utils/postQuality.js";
import postPlantReport from "./utils/postPlantReport.js";
import { fetchData } from "../calculations/Calculation.js";
import postEnergyData from "./utils/postEnergyData.js";

const getTimeUntilEndOfDay = () => {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    return endOfDay - now;
}

const postReport = async () => {
    const PLCData = await fetchData('https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getPLC/data/PLC/');
    let shiftStatus = PLCData?.ShiftS;
    const {noCavity} = await fetchData('https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getShiftaata/data/Shift/')
 
    let ProdCount = PLCData?.Prodcount * noCavity;
    // console.log(ProdCount)
    if (shiftStatus === 1) {
        postProductionReport({ProdCount});
    }

    // Schedule the plant report to be posted at the end of the day
    const timeUntilEndOfDay = getTimeUntilEndOfDay();
    setTimeout(() => {
        postPlantReport();
        postEnergyData();
        // Update the last report date if needed
        // setLastReportDate(new Date().toISOString().split('T')[0]);
    }, timeUntilEndOfDay);

    // const responseData = await finalData();
    // postDowntimeReport(responseData.data[0]);
    // postQuality(responseData.data[0]);
}

export default postReport;
