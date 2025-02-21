
// const url = "https://dev.api.golain.io/e8ab8d81-a0d6-46f6-87f1-e5ec6c9d763e/wke/get_device-data/feat001/data/";
const url="https://dev.api.golain.io/e8ab8d81-a0d6-46f6-87f1-e5ec6c9d763e/wke/plcData/plc/data/"
const deviceData = async () => {
    
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'APIKEY 76cbcf0bd4f387828b4b3555eb78330ea5c64d65cdb43a588e4c555917ffd9b5',
                'org-id': 'c1f462c4-d2fe-4517-a7c8-a0d32694a158'
            }
        });
        const responseData = await response.json();
        return responseData.data[0];
    } catch (error) {
        console.error(error);
        return null;
    }
};
export default deviceData