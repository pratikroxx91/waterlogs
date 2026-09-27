// connecting to the database
import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.DBURI;

const connectDB = async () => {
    await mongoose.connect(url).then(() => {
        console.log("DB connected!");
    }).catch((err) => {
        console.log(err);
    })
}
export default connectDB;