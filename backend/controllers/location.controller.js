import location from "../models/location.model.js"

export const getListLocation = async (req, res) => {
    const listLocation = await location.find({}, {name: 1})
    res.json(listLocation)
}