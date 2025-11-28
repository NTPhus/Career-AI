import major from "../models/major.model.js";
import axios from "axios";
import { toNonAccentAndSlugify } from "../utils/slug.js";

export const getListMajor = async (req, res) => {
    const listMajor = await major.find();
    res.json(listMajor)
}

export const searchMajor = async (req, res) => {
    let data = req.body.major;
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
    let R = 0, I = 0, A = 0, S = 0,E = 0,C = 0;
    const scores = { R, I, A, S, E, C };
    const RIASEC = ['R', 'I', 'A', 'S', 'E', 'C'];
    Object.entries(data).forEach(([key, value]) => {
        if(RIASEC.includes(key[0]))
            scores[key[0]] += value;
    });

    const top3 = Object.entries(scores).sort((a,b)=> b[1] - a[1]).slice(0,3).map(([key, value]) => ( key ));

    try {
        const response = await axios.post("http://127.0.0.1:5000/predict", data);
        // console.log("🎯 Prediction:", response.data.prediction);
        const predict = response.data.prediction;
        const result = {predict, top3}
        res.json(result);
    } catch (error) {
        console.error("❌ Error calling model:", error.message);
    }
}