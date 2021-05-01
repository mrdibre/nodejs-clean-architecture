const Env = {
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/clean-node-api",
  port: process.env.PORT || 5050,
};

export default Env;
