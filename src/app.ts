import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDatabase from './utils/database'; 
import flightRoutes from './routes/flightRoutes';

dotenv.config();
const app = express();

app.use(bodyParser.json());

// 调用数据库连接函数
connectDatabase();

app.use(flightRoutes);

export default app;
