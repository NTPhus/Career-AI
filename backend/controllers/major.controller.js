import major from "../models/major.model.js";
import axios from "axios";

export const getListMajor = async (req, res) => {
    const listMajor = await major.find().skip(0).limit(25);
    res.json(listMajor)
}

export const predictMajor = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const response = await axios.post("http://127.0.0.1:5000/predict", data);
        console.log("🎯 Prediction:", response.data.prediction);
        res.json(response.data.prediction);
    } catch (error) {
        console.error("❌ Error calling model:", error.message);
    }
}