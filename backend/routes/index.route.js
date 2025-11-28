import chatRoutes from "./chat.route.js";
import questionRoutes from "./question.route.js";
import majorRoutes from "./major.route.js";
import universityRoutes from "./university.route.js";
import locationRoutes from "./location.route.js";


export default (app) => {
  app.use("/chat", chatRoutes);
  app.use("/question", questionRoutes);
  app.use("/major", majorRoutes);
  app.use("/university", universityRoutes);
  app.use("/location", locationRoutes)
};
