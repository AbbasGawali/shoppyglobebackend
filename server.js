import express from "express"
import dotenv from "dotenv"
import "./config/connection.js"
dotenv.config();
import productRouter from "./routes/ProductRoutes.js"
import cartRouter from "./routes/cartRouter.js"
import userRouter from "./routes/userRouter.js"

const app = express();
const port = process.env.port || 8000;



// middlewares usage

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);


app.get("/", (req, res) => {
    res.send("Welcome to Shoppy globe.");
})

app.listen(port, () => {
    console.log(`listening at port ${port}`)
})
