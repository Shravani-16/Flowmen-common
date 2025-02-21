import axios from "axios";

//<-------------main line data------------>
const barData = async () => {
  let start = new Date(new Date() - 12 * 60000).toISOString();
  let stop = new Date().toISOString();
  // const URL = `https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getBarData/get-barData/`;
  const URL = "https://api.golain.io/876dbb57-d0aa-447b-ac43-983b1b1aca19/wke/getPLC/data/PLC/"


  try {
    const response = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
        'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
      },
    });
    const responseData = await response.json();
    const data = responseData.data;

    // console.log(responseData.data)

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default barData;
