const mongoose = require('mongoose');

const mbtiSchema = new mongoose.Schema(
    {
        stt: Number,
        question: String,
        ans1: String,
        ans2: String,
        rs_ans_1: String,
        rs_ans_2: String
    }
)

const mbti = mongoose.model("mbti",mbtiSchema,"mbti");

module.exports = mbti;