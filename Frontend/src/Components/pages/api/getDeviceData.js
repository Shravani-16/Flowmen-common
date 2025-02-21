
// const URL = 'https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/get-devicedata/device/data/'
const URL = "https://dev.api.golain.io/e8ab8d81-a0d6-46f6-87f1-e5ec6c9d763e/wke/meterData/meter/data/"
const headers = {
    // 'Content-Type': 'application/json',
    // 'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
    // 'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
    'Authorization': 'APIKEY 76cbcf0bd4f387828b4b3555eb78330ea5c64d65cdb43a588e4c555917ffd9b5',
    'org-id': 'c1f462c4-d2fe-4517-a7c8-a0d32694a158'
}
const getDeviceData = async () => {
    const response = await (await fetch(URL, { headers })).json();
    // console.log(response.data)
    return response.data[0]
}

export default getDeviceData;