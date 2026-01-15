import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("✅ MongoDB connected")
  } catch (error) {
    console.error("❌ DB connection error:", error.message)
    process.exit(1) // ⬅️ STOP SERVER ON FAILURE
  }
}

export default connectDb
