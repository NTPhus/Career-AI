import major from "../models/major.model.js";
import axios from "axios";
import { toNonAccentAndSlugify } from "../utils/slug.js";

export const getListMajor = async (req, res) => {
    const listMajor = await major.find();
    res.json(listMajor)
}

export const searchMajor = async (req, res) => {
    let data = req.body.prop.major;
    data = data.split("/");
    const slugData = data.map(subArr => {
        if(Array.isArray(subArr))
            return subArr.map(item => toNonAccentAndSlugify(item));
        else
            return toNonAccentAndSlugify(subArr);
    })
    const result = await major.find({key: {$in: slugData}}).select({name: 1, video_links: 1}).limit(3);
    res.json(result)
}

export const predictMajor = async (req, res) => {
    const data = req.body;
    // console.log(data);
    try {
        const response = await axios.post("http://127.0.0.1:5000/predict", data);
        // console.log("🎯 Prediction:", response.data.prediction);
        res.json(response.data.prediction);
    } catch (error) {
        console.error("❌ Error calling model:", error.message);
    }
}