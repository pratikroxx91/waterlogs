import express from "express";
import cors from "cors";
import connectDB from "./src/dbase/connectDB.js";
import authRoutes from "./src/routes/authRoutes.js";
import userReportRoutes from "./src/routes/userReportRoutes.js";
import adminReportRoutes from "./src/routes/adminReportRoutes.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/reports", userReportRoutes);
app.use("/api/admin/reports", adminReportRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
