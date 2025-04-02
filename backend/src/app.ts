import express from 'express';
import "reflect-metadata";
import cors from 'cors';
import dotenv from 'dotenv';
import "reflect-metadata";
dotenv.config();
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFountError';
import container from './config/diContainer'
import { AdharRouter } from './routes/implimentation/adharRouter';

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.FRONTENT_URL
}))
const adharRouter = container.resolve(AdharRouter)
app.use(adharRouter.router);
app.all("*",(req,res)=>{
    throw new NotFoundError("path not found")
})
app.use(errorHandler as any)
export default app