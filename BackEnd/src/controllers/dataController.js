const FinalData = require("../models/FinalData.js");

exports.postData = async (req, res) => {
    try {
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'Please Enter Data' });
        }

        const newData = new FinalData({ ...data });
        await newData.save();

        res.status(201).json({ message: 'Data saved Successfully', data });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.finalData = async (req, res) => {
    try {
        const data = await FinalData.findOne().sort({ _id: -1 });

        if (!data) {
            return res.status(404).json({ message: 'No data Found' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching final data:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
