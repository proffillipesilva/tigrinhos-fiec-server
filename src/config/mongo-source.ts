import mongoose from "mongoose";

export default async function connectDB() {
    const url = process.env.MONGO_URL || "mongodb://localhost:3306/test";
   
    try {
      const mongo = await mongoose.connect(url, {
      });
      console.log("Successfully connected to ", mongo.connection.host)
    } catch (err: any) {
      console.error(err.message);
      process.exit(1);
    }
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
      console.log(`Database connected: ${url}`);
    });
   
    dbConnection.on("error", (err) => {
      console.error(`connection error: ${err}`);
    });
    return;
}