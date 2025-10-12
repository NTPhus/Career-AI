import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  group: String,
  answers: [{ type: String }]
});

const question = mongoose.model("question", questionSchema, "question");

export default question;