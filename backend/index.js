import  express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';



const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();
//const prisma = new PrismaClient();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello, GlobeTrotter backend is running!');
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});