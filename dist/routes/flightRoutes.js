"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flightController_1 = require("../controllers/flightController");
const router = express_1.default.Router();
router.get('/api/v1/flights', flightController_1.getFlights);
router.get('/api/v1/flights/aircraft/:aircraftId', flightController_1.getFlightsByAircraft);
router.get('/api/v1/flights/total-hours', flightController_1.getTotalFlightHours);
exports.default = router;
