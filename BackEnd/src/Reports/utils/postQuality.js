const axios = require("axios");

const postQuality = async (data) => {
    const url = 'https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/postQualityReport/post_qualityReport/';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
        'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
    };
    
    const postData = {
        "Ok": data.goodProduction,
        "NotOk": data.rejectedProduction,
        "rejection": Math.floor((Math.abs(data.goodProduction - data.rejectedProduction) / data.goodProduction) * 100),
    };
    
    let previousData = null;

    try {
        if (JSON.stringify(postData) !== JSON.stringify(previousData)) {
            const response = await axios.post(url, postData, { headers: headers });
            if (response) {
                previousData = postData;
            }
        } else {
            console.log('Data is identical to the previous one. Skipping post.');
        }
    } catch (error) {
        console.log("Error posting data:", error);
    }
};

module.exports = postQuality;
