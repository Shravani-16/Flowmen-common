import axios from "axios";
import { fetchCount } from "./fetchCount";



const postDowntime = async (data) => {

    const CountDown = await fetchCount()
    console.log(CountDown.downtime)
    const url = 'https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/postDowntimeReport/post-downtimeReport/';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
        'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
    }
    

    const postData = {
        "downtime": CountDown.downtime + data.time,
        "operator_Break": data.title === 'Operator Break' ? data.time:0,
        "waiton_Inspection": data.title === 'Operator Unavailable' ? data.time:0,
        "material_Unavailable": data.title === 'Material Unavailable' ? data.time:0,
        "operator_Unavailable":data.title === 'Waiting On Inspection' ? data.time:0,
        "mechine_issue":data.title === 'Machine Issues' ? data.time:0
      }
      
    let previousData = null;
    // console.log(postData)
    try {
        if (JSON.stringify(postData) !== JSON.stringify(previousData)) {
            const response = await axios.post(url, postData, { headers: headers });
            if (response) {
                // console.log('Data posted successfully.',postData);
                // Update previousData with the new data
                previousData = postData;
            }
        }else{
            console.log('Data is identical to the previous one. Skipping post.')
        }
        
        
    } catch (error) {
        console.log("error posting data:", error)
    }

}
export default postDowntime;