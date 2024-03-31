import "dotenv/config";
import express from "express";
import cors from "cors";
import { listingsRouter, userRouter } from "./routes";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/listing", listingsRouter);
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
