const mbtiRoutes = require("./mbti.route");

module.exports = (app) => {
    app.use("/mbti", mbtiRoutes);
};