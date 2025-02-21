import axios from 'axios'



export const getMembers = async()=>{
    const URL = "http://172.104.242.7:3000/member/data"
    try {
        const response =  await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}