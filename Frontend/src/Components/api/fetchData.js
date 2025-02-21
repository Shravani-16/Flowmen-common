export const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'APIKEY 68421f9c518fcd554ad4a6397039bacdb82b863dc4c5154b939d50ecbe3cb29b',
                'org-id': 'b7d31442-4487-4138-b69d-1fd97e7a5ae6'
            }
        });
        const responseData = await response.json();
        return responseData?.data?.[0];
    } catch (error) {
        console.error(error);
        return null;
    }
};