import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import userRouter from "./routes/userRoutes.js"
import formRouter from "./routes/formRoutes.js"

import cors from "cors"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:process.env.CLIENT,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))



app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});


app.use('/api/user',userRouter);
app.use('/api/forms',formRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
