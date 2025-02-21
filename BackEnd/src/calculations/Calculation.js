import deviceData from "../api/deviceData.js";

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const fetchData = async (url) => {
    try {
        console.log(`Fetching data from: ${url}`);
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
                'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        // console.log(`Data received from ${url}:`, responseData);
        return responseData?.data?.[0] || {}; // Return empty object instead of null
    } catch (error) {
        console.error("Fetch error:", error.message);
        return {}; 
    }
};

const productionVolume = 700;
const machinesInProduction = 41;

const Calculate = async () => {
    console.log("Starting Calculate function...");
    const userinput = await fetchData('https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/get-user-input-data/data/');
    const MeterData = await fetchData('https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getMeterData/data/meter/');
    const PLCData = await fetchData('https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getPLC/data/PLC/');

    if (!userinput || !MeterData || !PLCData) {
        console.error("Failed to fetch required data.");
        return null;
    }

    console.log("Fetched Data:", { userinput, MeterData, PLCData });

    const operationTime = PLCData.Shift || 1;
    const plannedOperation = userinput.plannedProductionTime || 1;
    const idealTimeInSeconds = userinput.ideal_cycle_time || 1; 
    const actualTimeInSeconds = PLCData.CycleT || 1; 
    const totalPartsProduced = PLCData.Prodcount || 1; 
    const goodParts = userinput.good_production || 0; 

    console.log("Calculation Inputs:", { operationTime, plannedOperation, idealTimeInSeconds, actualTimeInSeconds, totalPartsProduced, goodParts });

    // Availability Calculation
    const macAvail = () => Math.ceil((operationTime / plannedOperation) * 100);

    // Performance Calculation
    const macPerf = () => (actualTimeInSeconds === 0 ? 0 : Math.ceil((idealTimeInSeconds / actualTimeInSeconds) * 100));

    // Quality Calculation
    const proQual = () => Math.ceil((totalPartsProduced === 0 ? 0 : goodParts / totalPartsProduced) * 100);

    // OEE Calculation
    const macOEE = () => Math.ceil((macAvail() * macPerf() * proQual()) / 10000);

    // Energy Calculation
    const Energy1 = MeterData.kWh / (PLCData.Prodcount || 1); 
    const Energy2 = MeterData.kWh / (userinput.good_production || 1); 

    console.log("Calculated Values:", { macAvail: macAvail(), macPerf: macPerf(), proQual: proQual(), macOEE: macOEE(), Energy1, Energy2 });

    const data = {
        "device_id": PLCData.device_id || "N/A",
        "oee": macOEE() || 0,
        "quality": proQual() || 0,
        "Downtime": PLCData.MdownT || 0,
        "performance": macPerf() || 0,
        "availability": macAvail() || 0,
        "Energy": Energy1 || 0,
        "EnergyPerGood": Energy2 || 0,
        "machineId": PLCData.MID || "Unknown"
    };

    console.log("Final Data Object:", data);
    return data;
};

export default Calculate;
