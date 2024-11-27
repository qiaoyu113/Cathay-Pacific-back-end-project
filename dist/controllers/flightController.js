const flightLogModel = __importDefault(require("../models/flightLogModel"));

// API 1: Retrieve Flight Logs with Pagination and Sorting
const getFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, sort = 'departureTime' } = req.query;
        const flights = yield flightLogModel.default.find()
            // .find({ createdAt: { $lt: new Date("2023-11-26T10:00:00Z") } }) // 游标条件
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
        const flights = yield flightLogModel.default.find(query);
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
        const flights = yield flightLogModel.default.aggregate([
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
