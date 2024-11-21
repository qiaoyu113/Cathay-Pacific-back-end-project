# Flight Backend System

This project is a **Flight Log Management System** for handling flight logs of an airline's fleet. The system provides an efficient way to manage large volumes of data, supporting features like searching, pagination, sorting, and data aggregation. This backend is built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**, with realistic mock data generated for testing purposes.

---

## Author

**Yu Qiao (Joey)**  
Email: qiaoyu.joey@gmail.com  
This project is developed and maintained by Yu Qiao (Joey). For any inquiries or discussions regarding this project, feel free to reach out.

---

## Key Features

- **Flight Log Retrieval**: Get flight logs with efficient pagination and sorting.
- **Flight Query by Aircraft**: Query flight logs for specific aircraft, optionally filtering by flight status.
- **Flight Hours Calculation**: Calculate total flight hours within a specified date range for completed flights.
- **Mock Data Generation**: Generate realistic flight log data using `@faker-js/faker`.

---

## Project Structure

```
.
├── scripts/
│   ├── generateData.ts        # Script to generate mock flight log data
├── src/
│   ├── controllers/           # Handles business logic for API endpoints
│   │   ├── flightController.ts
│   ├── models/                # Defines data models for MongoDB
│   │   ├── flightLogModel.ts
│   ├── routes/                # Defines application routes
│   │   ├── flightRoutes.ts
│   ├── utils/                 # Utility modules (e.g., database connection)
│   │   ├── database.ts
│   ├── app.ts                 # Express application configuration
│   ├── server.ts              # Server entry point
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

---

## Backend Modules

### `flightController.ts`
- **Purpose**: Handles business logic for managing flight logs.
- **Key Features**:
  - **Get Flights**: Retrieve flight logs with pagination and sorting capabilities.
  - **Query by Aircraft**: Filter flights by aircraft ID and optionally by status.
  - **Total Flight Hours**: Calculate total flight hours for completed flights within a specified date range.

### `flightLogModel.ts`
- **Purpose**: Defines the schema for the flight logs stored in MongoDB.
- **Key Features**:
  - Fields include `flightId`, `aircraftId`, `departureAirport`, `arrivalAirport`, `departureTime`, `arrivalTime`, `status`, and `durationMinutes`.

### `generateData.ts`
- **Purpose**: Generates realistic mock flight log data for testing.
- **Key Features**:
  - Uses `@faker-js/faker` to generate diverse values for flight logs.
  - Populates the MongoDB `FlightLogs` collection with 10,000 records.

### `database.ts`
- **Purpose**: Manages the connection to MongoDB using Mongoose.
- **Key Features**:
  - Connects to MongoDB using the URI specified in the `.env` file.
  - Logs successful connections or errors.

---

## Installation and Running

### Prerequisites
- Node.js (v16+)
- MongoDB (v6.0+)
- npm or yarn

### Setup

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd flight-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/flightLogs
   PORT=3000
   ```

4. Generate mock data (optional, for testing purposes):
   ```bash
   npx ts-node scripts/generateData.ts
   ```

5. Start the development server:
   ```bash
   npx ts-node src/server.ts
   ```

   The server will run by default on [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### **GET /api/v1/flights**
- **Description**: Retrieve flight logs with pagination and sorting.
- **Query Parameters**:
  - `page` (optional): Page number.
  - `limit` (optional): Number of records per page.
  - `sort` (optional): Sorting field (e.g., `departureTime`).
- **Example**:
  ```
  GET /api/v1/flights?page=1&limit=10&sort=departureTime
  ```

### **GET /api/v1/flights/aircraft/:aircraftId**
- **Description**: Query flight logs by aircraft ID, optionally filtering by status.
- **Path Parameters**:
  - `aircraftId`: Unique identifier for the aircraft.
- **Query Parameters**:
  - `status` (optional): Flight status (`landed`, `scheduled`, etc.).
- **Example**:
  ```
  GET /api/v1/flights/aircraft/R1234?status=landed
  ```

### **GET /api/v1/flights/total-hours**
- **Description**: Calculate total flight hours for completed flights within a specified date range.
- **Query Parameters**:
  - `startDate` (required): Start date for filtering flights.
  - `endDate` (required): End date for filtering flights.
- **Example**:
  ```
  GET /api/v1/flights/total-hours?startDate=2024-01-01&endDate=2024-01-31
  ```

---

## Logic and Design

### Backend Logic
- **Database Optimization**: Uses MongoDB indexes to optimize query performance for large datasets.
- **Data Aggregation**: Uses the aggregation framework to calculate flight hours efficiently.
- **Scalability**: Implements pagination, sorting, and filtering to manage large volumes of data.

---

## Troubleshooting

### Common Issues

#### Database Connection Failed
- **Cause**: MongoDB service is not running or incorrect connection string in `.env` file.
- **Solution**: Start MongoDB service and verify `MONGO_URI` is correct.

#### API Not Responding
- **Cause**: Server not running or incorrect endpoint.
- **Solution**: Ensure the server is running on port `3000` and verify the endpoint URL.

---

## Future Enhancements
- **Authentication**: Implement token-based authentication for API security.
- **Real-Time Updates**: Add support for real-time flight status updates.
- **Enhanced Filters**: Support additional query filters (e.g., by airport, duration range).

---

## Contact
For further inquiries or suggestions, contact **Yu Qiao (Joey)** at [qiaoyu.joey@gmail.com](mailto:qiaoyu.joey@gmail.com).

---

Feel free to contribute to the project by opening issues or submitting pull requests.

