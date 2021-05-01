import Env from "./config/env";
import { app } from "./config/app";
import { MongoHelper } from "../infra/database/mongodb/helpers/mongo-helper";

MongoHelper.connect(Env.mongoUrl)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(Env.port, () =>
      console.log("Server running at http://localhost:5050"),
    );
  })
  .catch(console.error);
