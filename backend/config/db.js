import mongoose from "mongoose";
/* Here we are connection our server to mongodb database */
export const connectDB = async() => {
    try{
        const connectDB = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected : " + connectDB.connection.host)
    }
    catch(err){
        console.log("Error : " + err.message);
        process.exit();
    }
}

