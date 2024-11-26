import mongoose from 'mongoose';
import FlightLog from '../src/models/flightLogModel';
import { faker } from '@faker-js/faker'; // 使用新版 faker
import dotenv from 'dotenv';

dotenv.config();

const generateData = async () => {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    // 清空旧数据（可选）
    await FlightLog.deleteMany({});
    console.log('Cleared old data');

    // 生成新数据
    const flights = Array.from({ length: 10000 }).map(() => {
      const departureTime = faker.date.past();
      const arrivalTime = new Date(departureTime.getTime() + faker.number.int({ min: 30, max: 720 }) * 60000); // 随机飞行时间

      return {
        flightId: faker.string.alphanumeric(6).toUpperCase(),
        aircraftId: faker.string.alphanumeric(4).toUpperCase(),
        departureAirport: faker.location.city().slice(0, 3).toUpperCase(), // 取前三个字母作为机场代码
        arrivalAirport: faker.location.city().slice(0, 3).toUpperCase(),
        departureTime,
        arrivalTime,
        status: faker.helpers.arrayElement(['scheduled', 'departed', 'landed', 'canceled']),
        durationMinutes: Math.floor((arrivalTime.getTime() - departureTime.getTime()) / 60000),
      };
    });

    // 插入数据
    await FlightLog.insertMany(flights);
    console.log('Data generated successfully');
  } catch (error) {
    console.error('Error generating data:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

generateData();
