import FinalData from "../models/FinalData.js";

export const postData = async (req, res) => {

    try {
        const data = req.body;
        if (data) {
            const newData = new FinalData({
                ...data
            })
            await newData.save();
            res.status(201).json({ message: 'Data saved Successfully', data })
        } else {
            res.status(202).json({ message: 'Please Enter Data' })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Srever Error' })
    }
}

export const finalData = async(req, res)=>{
    try {
        const data = await FinalData.findOne().sort({ _id: -1 });

        if(!data){
           return res.status(404).json({message:'No data Found'})
        }
        return res.status(200).send(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal Server Error'})
    }
}