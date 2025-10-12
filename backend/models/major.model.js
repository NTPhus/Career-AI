import mongoose from "mongoose";

const majorSchema = new mongoose.Schema({
  id: Number,
  name: String,
  desc: String,
  video_links: String,
  num_school: Number,
});

const major = mongoose.model("major", majorSchema, "major");

export default major;