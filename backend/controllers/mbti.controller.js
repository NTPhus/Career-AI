import mbti from "../models/mbti.model.js";

// [GET] /mbti
export const index = async (req, res) => {
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
};
