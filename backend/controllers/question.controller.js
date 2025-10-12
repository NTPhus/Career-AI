import question from "../models/question.model.js";

export const getQuestion = async (req, res) => {
    const numPage = parseInt(req.params.form);
    const form = await question.find().skip(9 * (numPage-1)).limit(9)
    console.log(req.params.form);
    res.json(form)
}