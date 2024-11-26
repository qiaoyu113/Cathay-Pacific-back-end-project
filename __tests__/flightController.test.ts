import request from 'supertest';
import app from '../src/app'; // 引入 Express 应用
import mongoose from 'mongoose';

beforeAll(async () => {
  // 连接测试数据库
  await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  // 断开数据库连接
  await mongoose.disconnect();
});

describe('Flight API Endpoints', () => {
  test('API 1: Get flights with pagination', async () => {
    const res = await request(app).get('/api/v1/flights?page=1&limit=5');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(5); // 每页返回 5 条记录
  });

  test('API 2: Get flights by aircraftId and status', async () => {
    const res = await request(app).get('/api/v1/flights/aircraft/R123?status=landed');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    if (res.body.length > 0) {
      expect(res.body[0].aircraftId).toBe('R123');
      expect(res.body[0].status).toBe('landed');
    }
  });

  test('API 3: Calculate total flight hours within date range', async () => {
    const res = await request(app).get('/api/v1/flights/total-hours?startDate=2023-01-01&endDate=2023-12-31');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totalHours');
    expect(typeof res.body.totalHours).toBe('number');
  });
});
