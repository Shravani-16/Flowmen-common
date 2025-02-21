import axios from "axios"

const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/postOnetime/data/postOneTime/`;
    const headers = {
        'Authorization': `APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b`,
        'Org-Id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6',
        'Content-Type': 'application/json'
    };
const postOneTime = async (obj) => {
    const data = JSON.stringify(obj)
    
    
    try {
        const response = await axios.post(URL, data, { headers })
        // console.log("API postOneTime:", response.data);  
    } catch (error) {
        console.log("Error Occure: ", error)
    }
}

export default postOneTime;