import axios from "axios";

//<-------------Average line Data-------------->

let averages = []



const storeAvg = (data) => {

    let obj = { availAvg: '', oEEAvg: '', perfAvg: '', qualAvg: '' }

    Object.keys(data).forEach((key) => {
        obj[key] = Math.ceil(data[key])
    });
    if (averages.length < 5) {
        averages.push(obj)
    }
};
// const getAvgAvail = async () => {
//     const URL = "https://dev.api.golain.io/e8ab8d81-a0d6-46f6-87f1-e5ec6c9d763e/wke/get_Avg_of_Avail/getAvg/data/";

//     try {
//         const response = await fetch(URL, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'APIKEY 3a3ec533942689efae697b8d6319fc8a93501d9fbe7fbe8290e8d3f8f8ee9c8b',
//                 'org-id': 'c1f462c4-d2fe-4517-a7c8-a0d32694a158'
//             }
//         });
//         const responseData = await response.json();
//         const data = responseData.data;
//         storeAvg(data[0])
//         // console.log(averages)
//         // console.log(data[0])
//         return data[0];
//     } catch (error) {
//         console.log(error);
//     }
// };


//<-------------main line data------------>
const lineData = async () => {
    let start = new Date(new Date() - (12 * 60000)).toISOString();
    let stop = new Date().toISOString();
    const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/chart-data/chartData/data/?Autn=APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b`;
    let savedata = [];

    try {
        const response = await fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
                'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
            }
        });
        const responseData = await response.json();
        const data = responseData.data;

        if (data.length > 4) {
            savedata = data;
        }

        if (!data) {
            return savedata;
        }

        await getAvgAvail();
        let mergedData = {
            dataPoints: savedata,
            averages: averages
        }
        // console.log(mergedData)
        return mergedData;

    } catch (error) {
        console.log(error);
        return savedata;
    }
};

export default lineData;
