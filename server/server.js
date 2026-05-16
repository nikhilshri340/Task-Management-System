import dotenv from "dotenv";
import userRoutes from "./src/routes/user.routes.js";
dotenv.config();
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(
  "/api/users",
  userRoutes
);