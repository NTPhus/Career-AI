import university from "../models/university.model.js"

export const getListUniversity = async (req, res) => {
    // const listUniversity = await university.find().skip(0).limit(25);
    const listUniversity = await university.find()

    res.json(listUniversity)
}