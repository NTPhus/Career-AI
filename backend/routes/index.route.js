import mbtiRoutes from "./mbti.route.js";
import chatRoutes from "./chat.route.js";

export default (app) => {
  app.use("/mbti", mbtiRoutes);
  app.use("/chat", chatRoutes);
};
