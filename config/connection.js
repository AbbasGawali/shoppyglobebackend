import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGOURL, { dbName: "shoppyGlobeBackend" }).then(() => {
    console.log("connection success");
}).catch((err) => {
    console.log("connection failed with error : " + err)
})