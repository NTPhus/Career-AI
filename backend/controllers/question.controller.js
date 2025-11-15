import question from "../models/question.model.js";

export const getQuestion = async (req, res) => {
    const form = await question.find()
    res.json(form)
}

export const predict = async (req, res) => {
    try {
    const response = await axios.post("http://localhost:5000/predict", {
      features: {
        AVG_score: [8.5],
        Fav_subject_1: ["Toán"],
        Fav_subject_2: ["Lý"],
        Fav_subject_3: ["Hóa"],
        Prize: ["Yes"],
        Hobby_1: ["Nghiên cứu"],
        Hobby_2: ["Xem phim"],
        Hobby_3: ["Nghe nhạc"],
        Character: ["Hướng nội"],
        Career_trends_1: ["Lương cao"],
        Career_trends_2: ["Khám phá"],
        Career_trends_3: ["Thăng tiến nhanh"],
      },
    });
    res.json({"Prediction": response.data.prediction});
  } catch (error) {
    res.error("❌ Error calling model:", error.message);
  }
}