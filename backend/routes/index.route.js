import chatRoutes from "./chat.route.js";
import questionRoutes from "./question.route.js";

export default (app) => {
  app.use("/chat", chatRoutes);
  app.use("/question", questionRoutes)
};
