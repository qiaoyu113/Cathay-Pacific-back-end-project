import express from 'express';
import { getFlights, getFlightsByAircraft, getTotalFlightHours } from '../controllers/flightController';

const router = express.Router();

router.get('/api/v1/flights', getFlights);
router.get('/api/v1/flights/aircraft/:aircraftId', getFlightsByAircraft);
router.get('/api/v1/flights/total-hours', getTotalFlightHours);

export default router;
