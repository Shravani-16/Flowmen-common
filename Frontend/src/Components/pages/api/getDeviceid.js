import axios from "axios"

const url = "https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/get-device-id/id/";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
    'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
}
const getDeviceID = async () => {
    const response = await fetch(url, {
        // params: Parameters,
        headers
    });
    const responseData = await response.json();
    // console.log("device-ID: ",responseData);
    return responseData.data


}

export default getDeviceID;