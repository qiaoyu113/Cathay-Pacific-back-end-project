import { Request, Response } from 'express';
import FlightLog from '../models/flightLogModel';

// API 1: Retrieve Flight Logs with Pagination and Sorting
export const getFlights = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, sort = 'departureTime' } = req.query;
    const flights = await FlightLog.find()
      .sort({ [sort as string]: 1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

// API 2: Query Flights by Aircraft and Status
export const getFlightsByAircraft = async (req: Request, res: Response) => {
  try {
    const { aircraftId } = req.params;
    const { status } = req.query;
    const query: any = { aircraftId };
    if (status) query.status = status;

    const flights = await FlightLog.find(query);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

// API 3: Calculate Total Flight Hours Within a Date Range
export const getTotalFlightHours = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const flights = await FlightLog.aggregate([
      {
        $match: {
          status: 'landed',
          departureTime: { $gte: new Date(startDate as string), $lte: new Date(endDate as string) },
        },
      },
      {
        $group: {
          _id: null,
          totalMinutes: { $sum: '$durationMinutes' },
        },
      },
    ]);

    const totalHours = flights.length > 0 ? flights[0].totalMinutes / 60 : 0;
    res.json({ totalHours });
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate total flight hours' });
  }
};
