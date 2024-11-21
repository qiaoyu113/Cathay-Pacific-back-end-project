import mongoose, { Schema, Document } from 'mongoose';

export interface IFlightLog extends Document {
  flightId: string;
  aircraftId: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
  status: string;
  durationMinutes: number;
}

const FlightLogSchema: Schema = new Schema({
  flightId: { type: String, required: true, unique: true },
  aircraftId: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date },
  status: { type: String, enum: ['scheduled', 'departed', 'landed', 'canceled'], required: true },
  durationMinutes: { type: Number },
});

export default mongoose.model<IFlightLog>('FlightLog', FlightLogSchema);
