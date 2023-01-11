const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config({ path: "backend/config/config.env" });

const SERVER_PORT = process.env.PORT || 3000;

connectDB();

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
