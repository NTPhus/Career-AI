const mbti = require("../models/mbti.model");

//[GET] /mbti
module.exports.index = async (req,res) => {
    try {
        const mbtiQuestion = await mbti.find({});
        console.log(mbtiQuestion);
         res.json({
            code: 200,
            data: mbtiQuestion,
            });
    } catch (error) {
        res.json({
        code: 400,
        message: "Lỗi hệ thống",
    });
    }
}