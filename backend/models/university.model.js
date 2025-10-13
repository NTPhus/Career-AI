import mongoose from "mongoose";

// admissions.{method}
const thptSchema = new mongoose.Schema({
  score: { type: Number, required: true, min: 0 }
}, { _id: false });

const hocBaSchema = new mongoose.Schema({
  score: { type: Number, required: true, min: 0 }
}, { _id: false });

const dgnlSchema = new mongoose.Schema({
  score: { type: Number, required: true, min: 0 },
  location: { type: String } // ví dụ: "DGNL ĐHQG TP.HCM"
}, { _id: false });

const admissionsSchema = new mongoose.Schema({
  thpt: thptSchema,   // điểm theo kỳ thi THPT
  hoc_ba: hocBaSchema, // xét học bạ
  dgnl: dgnlSchema    // đánh giá năng lực
}, { _id: false });

const majorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, trim: true },
  // "M01", "M09", ...
  combinations: [{
    type: String,
    trim: true,
    match: /^M\d{2}$/ // tùy bạn, có thể bỏ nếu không muốn ràng buộc
  }],
  admissions: admissionsSchema
}, { _id: false });

const universitySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  desc: { type: String, trim: true },
  video_links: { type: String, trim: true },
  tuition_fee_link: { type: String, trim: true },
  admission_reference: { type: String, trim: true },
  majors: [majorSchema]
}, { timestamps: true });

universitySchema.index({ name: "text", location: "text" });
universitySchema.index({ id: 1 }, { unique: true });
universitySchema.index({ "majors.code": 1 });
universitySchema.index({ "majors.combinations": 1 }); // tìm theo mã tổ hợp nhanh hơn

export default mongoose.model("university", universitySchema, "university");
