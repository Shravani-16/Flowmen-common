import axios from "axios";
// import { fetchData } from "../calculations/Calculation.js";
// import postReport from "../Reports/postReport.js";
import fetchdata from "../../api/fetchdata.js";
import storage from 'node-persist';

// Initialize storage
await storage.init();

const postProductionReport = async ({ProdCount}) => {
    const url = 'https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/postProductionReport/post-productionReport/';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
        'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
    };

    const data = await fetchdata("https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getProductiondata/data/production");
    // console.log(data)
    const postData = {
        "batchNo": data?.shiftWise[0]?.batchNo,
        "downtimeReason": data?.operator[0]?.downtimeReason,
        "targetQty": data?.shiftWise[0]?.productionTarget,
        "okQty": data?.QC[0]?.goodProduction,
        "macNo": data?.shiftWise[0]?.macId,
        "mouldId": data?.shiftWise[0]?.mouldId,
        "productName": data?.shiftWise[0]?.productName,
        "rejectedReason": data?.QC[0]?.rejectedReason,
        "rejectedQty": data?.QC[0]?.rejectedProduction,
        "downtime": data?.pData[0]?.downtime,
        "device_id": data?.pData[0]?.device_id,
        "customer": data?.oneTime[0]?.customer,
        "actualProd": ProdCount
    };
    // console.log(postData)
    try {
        // Retrieve the previous data from storage
        let previousData = await storage.getItem('previousProductionData');

        if (JSON.stringify(postData) !== JSON.stringify(previousData)) {
            const response = await axios.post(url, postData, { headers: headers });
            if (response) {
                console.log('Data posted successfully: ProductionData');
                // Update previousData in storage
                await storage.setItem('previousProductionData', postData);
            }
        } else {
            console.log('Data is identical to the previous one. Skipping post: ProductionData');
        }

    } catch (error) {
        console.log("Error posting data: ProductionData", error);
    }
};

export default postProductionReport;
