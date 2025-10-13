import major from "../models/major.model.js"

export const getListMajor = async (req, res) => {
    const listMajor = await major.find().skip(0).limit(25);
    res.json(listMajor)
}