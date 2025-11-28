import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  id: Number,
  name:String
});

const location = mongoose.model("location", locationSchema, "location");

export default location;