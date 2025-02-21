const fetchdata = async (URL) => {
    try {
        const response = await fetch(URL,  {
            headers: {
                'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
                'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
            }
        });
        const responseData = await response.json();
        // console.log(responseData.data)
        return responseData.data;
    } catch (error) {
        console.log("Error Fetching Data");
    }
}
export default fetchdata;
