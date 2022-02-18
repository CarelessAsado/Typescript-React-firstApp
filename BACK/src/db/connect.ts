import mongoose from "mongoose";

export default async function connectDB(uri: string, cbServer: Function) {
  try {
    await mongoose.connect(uri);
    console.log("Connected to Atlas");
    cbServer();
  } catch (error: any) {
    console.log(error.message);
  }
}
