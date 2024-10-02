import mongoose from "mongoose";
import initializeFirebase from "../firebase/init";

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL as string)
        console.log('Connected to db successfully');
        initializeFirebase()
    } catch (e) {
        console.error("DB connection failed:", e)
    }
}

export default connect