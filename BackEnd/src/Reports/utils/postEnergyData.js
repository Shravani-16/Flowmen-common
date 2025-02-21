import axios from "axios";
// import { fetchData } from "../calculations/Calculation.js";
// import postReport from "../Reports/postReport.js";
import fetchdata from "../../api/fetchdata.js";
import storage from 'node-persist';

// Initialize storage
await storage.init();

const postEnergyData = async () => {
    const url = 'https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/postenergyData/postData/energyData/';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
        'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
    };

    const data = await fetchdata("https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getEnergyData/data/Energy/");
    // console.log(data)
    const postData = {
       "device_id":data?.calData?.[0].device_id,
       "Energy":data?.mData?.[0].kWh,
       "energyPerGood":(data?.calData?.[0].EnergyPerGood).toFixed(2),
       "energyPerTotal":(data?.calData?.[0].Energy).toFixed(2)
    };
    // console.log(data?.mData?.[0].kWh,)
    try {
        // Retrieve the previous data from storage
        let previousData = await storage.getItem('previousEnergyData');

        if (JSON.stringify(postData) !== JSON.stringify(previousData)) {
            const response = await axios.post(url, postData, { headers: headers });
            if (response) {
                console.log('Data posted successfully: EnergyData');
                // Update previousData in storage
                await storage.setItem('previousProductionData', postData);
            }
        } else {
            console.log('Data is identical to the previous one. Skipping post: EnergyData');
        }

    } catch (error) {
        console.log("Error posting data: EnergyData", error.message);
    }
};

export default postEnergyData;
