import mongoose from "mongoose";
const connectDB = async ()=> {
    return await mongoose.connect(process.env.DB_URL).then(()=>{console.log("database connection established")}).catch((err)=>{
        console.log("database connection error: " + err)
    })
}


export default connectDB;