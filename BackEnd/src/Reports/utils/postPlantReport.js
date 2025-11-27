const axios = require("axios");
const fetchdata = require("../../api/fetchdata.js");
const storage = require("node-persist");

// Initialize storage
(async () => {
    await storage.init();
})();

const postPlantReport = async () => {
    const url = "https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/postPlantData/plant-data/data/";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b",
        "org-id": "b7d31442-4487-4138-b69d-1fd97e7a5ae6",
    };

    const data = await fetchdata("https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getPlantData/data/plant/");

    const postData = {
        device_id: data?.calData[0]?.device_id,
        oee: data?.calData[0]?.oee,
        energy1: data?.calData[0]?.Energy,
        energy2: data?.calData[0]?.EnergyPerGood,
        quality: data?.calData[0]?.quality,
        performance: data?.calData[0]?.performance,
        availability: data?.calData[0]?.availability,
        downtime: data?.calData[0]?.Downtime,
        good: data?.uData[0]?.goodProduction,
        rejected: data?.uData[0]?.rejectedProduction,
        weight: data?.uData[0]?.idealPartWeight,
    };

    try {
        // Retrieve the previous data from storage
        let previousData = await storage.getItem("previousplantData");

        if (JSON.stringify(postData) !== JSON.stringify(previousData)) {
            const response = await axios.post(url, postData, { headers: headers });
            if (response) {
                console.log("Data posted successfully: PlantData");
                await storage.setItem("previousplantData", postData);
            }
        } else {
            console.log("Data is identical to the previous one. Skipping post: PlantData");
        }
    } catch (error) {
        console.log("Error posting plant data:", error.message);
    }
};

module.exports = postPlantReport;
