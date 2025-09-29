const axios = require("axios");
const express = require("express");
const route = require("./routes/index.route");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json());

route(app);

async function callModel() {
  try {
    const response = await axios.post("http://localhost:5000/predict", {
      features: {
    "AVG_score": [8.5],
    "Fav_subject_1": ["Toán"],
    "Fav_subject_2": ["Lý"],
    "Fav_subject_3": ["Hóa"],
    "Prize": ["Yes"],
    "Hobby_1": ["Nghiên cứu"],
    "Hobby_2": ["Xem phim"],
    "Hobby_3": ["Nghe nhạc"],
    "Character": ["Hướng nội"],
    "Career_trends_1": ["Lương cao"],
    "Career_trends_2": ["Khám phá"],
    "Career_trends_3": ["Thăng tiến nhanh"]
} // ví dụ dữ liệu
    });
    console.log("Prediction:", response.data.prediction);
  } catch (error) {
    console.error("Error calling model:", error.message);
  }
}

callModel();

app.listen(port, () => {
    console.log("Server is running at http://localhost:3000");
})

mongoose.connect(databaseURL).then(() => console.log('BD Connection Successfull')).catch(err=>console.log(err));