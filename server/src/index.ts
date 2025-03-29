import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import QueryRoutes from "./routes/route";
import AuthRoutes from "./routes/auth";
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/query", QueryRoutes);
app.use("/api/auth", AuthRoutes);
app.listen(port, () => {
  console.log(`Port is running in ${port}`);
});
