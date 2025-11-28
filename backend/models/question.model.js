import mongoose from "mongoose";

const questionItemSchema = new mongoose.Schema({
  id: Number,
  question: String,
  group: String,
  answers: [String],
  category: String,
  riasec_code: String,
  tipi_index: Number,
  subtype: String
});

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["R", "I", "A", "S", "E", "C", "TIPI", "OTHER"],
    required: true
  },

  questions: {
    type: [questionItemSchema],   // <-- Mảng chứa object đúng chuẩn
    required: true
  }
});

const question = mongoose.model("question", questionSchema, "question");

export default question;