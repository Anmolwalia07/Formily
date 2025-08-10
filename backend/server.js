import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import userRouter from "./routes/userRoutes.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});


app.get('/api/user',userRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
