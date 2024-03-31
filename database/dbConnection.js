import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName : "SHOPPING-PORTAL-API"
    }).then(() => console.log("Connected to database successfully"))
    .catch((err) => console.log("Something went wrong", err))
}