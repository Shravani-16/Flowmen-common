import axios from 'axios';
import Calculate, { fetchData } from '../calculations/Calculation.js';
import postReport from '../Reports/postReport.js';
import storage from 'node-persist';


// Initialize node-persist
await storage.init({
    dir: './cache',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,
    ttl: false  // Time to live, set to false for no expiration
});

// Function to compare only the relevant keys
const isEqual = (obj1, obj2) => {
    const keys = [
        'device_id', 'oee', 'quality', 'Downtime', 'performance', 'availability', 'Energy',
        'EnergyPerGood', 'machineId',
    ];

    return keys.every(key => obj1[key] === obj2[key]);
};



// Function to post data to the API
const postAPIData = async () => {

    try {
        const previousData = await storage.getItem('previousData');
        const data = await Calculate();
        const PLCData = await fetchData('https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getPLC/data/PLC/');
        
        if (data && !isEqual(data, previousData)) {
            const url = 'https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/postcalData/data/cal/';
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
                'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
            };

            const response = await axios.post(url, data, { headers });
            if (response.status === 200) {
                console.log('Final Data posted successfully.');
                await storage.setItem('previousData', data);
            }
        } else {
            console.log('Data is identical to the previous one. Skipping post: End Data');
        }
        

        
    } catch (error) {
        console.error('An error occurred in postAPIData:', error);
    }
};

// Function to repeatedly post data
export const postAllData = () => {
   
    setInterval(postAPIData, 5000);
};

// Function to repeatedly post reports
const postAllReport = () => {
    setInterval(() => {
        postReport();
    }, 300000);
};

// Start posting data at intervals
postAllData();
postAllReport();

