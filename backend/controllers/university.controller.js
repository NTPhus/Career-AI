import university from "../models/university.model.js"

export const getListUniversity = async (req, res) => {
    // const listUniversity = await university.find().skip(0).limit(25);
    const listUniversity = await university.find()

    res.json(listUniversity)
}

export const searchUniversity = async (req, res) => {
    const name = req.query.name;

    if(name){
        const regex = new RegExp(name, "i");
        const resultSearch = await university.find({
            name: regex
        })
        res.json(resultSearch);
    }else{
        res.json({"Error":"Name is null"});
    } 
}