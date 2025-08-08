import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import productRoute from "./routes/product.routes.js";
import orderRoute from "./routes/order.routes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/v1", productRoute);
app.use("/api", orderRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
