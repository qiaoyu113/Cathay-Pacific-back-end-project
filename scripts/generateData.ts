import mongoose from 'mongoose';
import FlightLog from '../src/models/flightLogModel';
import faker from 'faker';
import dotenv from 'dotenv';

dotenv.config();

const generateData = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('Connected to DB');

  const flights = Array.from({ length: 10000 }).map(() => ({
    flightId: faker.random.alphaNumeric(6).toUpperCase(),
    aircraftId: faker.random.alphaNumeric(4).toUpperCase(),
    departureAirport: faker.address.cityPrefix().toUpperCase(),
    arrivalAirport: faker.address.cityPrefix().toUpperCase(),
    departureTime: faker.date.past(),
    arrivalTime: faker.date.future(),
    status: faker.helpers.randomize(['scheduled', 'departed', 'landed', 'canceled']),
    durationMinutes: faker.datatype.number({ min: 30, max: 720 }),
  }));

  await FlightLog.insertMany(flights);
  console.log('Data generated successfully');
  mongoose.disconnect();
};

generateData();
