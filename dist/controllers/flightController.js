"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalFlightHours = exports.getFlightsByAircraft = exports.getFlights = void 0;
const flightLogModel_1 = __importDefault(require("../models/flightLogModel"));
// API 1: Retrieve Flight Logs with Pagination and Sorting
const getFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, sort = 'departureTime' } = req.query;
        const flights = yield flightLogModel_1.default.find()
            .sort({ [sort]: 1 })
            .skip((+page - 1) * +limit)
            .limit(+limit);
        res.json(flights);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch flights' });
    }
});
exports.getFlights = getFlights;
// API 2: Query Flights by Aircraft and Status
const getFlightsByAircraft = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { aircraftId } = req.params;
        const { status } = req.query;
        const query = { aircraftId };
        if (status)
            query.status = status;
        const flights = yield flightLogModel_1.default.find(query);
        res.json(flights);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch flights' });
    }
});
exports.getFlightsByAircraft = getFlightsByAircraft;
// API 3: Calculate Total Flight Hours Within a Date Range
const getTotalFlightHours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        const flights = yield flightLogModel_1.default.aggregate([
            {
                $match: {
                    status: 'landed',
                    departureTime: { $gte: new Date(startDate), $lte: new Date(endDate) },
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
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to calculate total flight hours' });
    }
});
exports.getTotalFlightHours = getTotalFlightHours;
