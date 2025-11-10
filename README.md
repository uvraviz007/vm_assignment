# FuelEU Maritime Compliance Backend

## BACKEND

This backend service supports the Fuel EU Maritime compliance dashboard. It provides APIs to manage shipping routes, compute compliance balances (CB), handle banking and pooling of emissions, and serve data to the frontend dashboard.

Technologies used:

* Node.js + TypeScript
* Express.js for HTTP APIs
* Prisma ORM for PostgreSQL database interaction
* Hexagonal Architecture (Ports & Adapters / Clean Architecture)

The service ensures separation of business logic from frameworks and infrastructure, facilitating maintainability, testability, and clear domain modeling.

---

## Architecture Summary

The project follows a hexagonal (Ports & Adapters) architecture:

```
src/
  core/
    domain/          # Entities and domain logic
    application/     # Use-cases implementing business rules
    ports/           # Interfaces for inbound/outbound operations
  adapters/
    inbound/http/    # Express routes and controllers
    outbound/postgres/ # Prisma repositories
  infrastructure/
    db/              # Database setup and migrations
    server/          # Express server setup
  shared/            # Shared utilities and types
```

* Core: Pure business logic, no framework dependencies.
* Inbound Adapters: HTTP controllers exposing APIs to the frontend.
* Outbound Adapters: Database repositories and external integrations.
* Infrastructure: Prisma client setup, Express server initialization.

---

## Setup & Run Instructions

1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies

```bash
npm install
```

3. Set environment variables

* Create a `.env` file at the root.

```env
DATABASE_URL="postgresql://username:password@host:5432/dbname?sslmode=require"
PORT=3001
```

4. Run Prisma migrations

```bash
npx prisma migrate dev
```

5. Generate Prisma client

```bash
npx prisma generate
```

6. Start the server

```bash
npm run dev
```

Server will be available at: `http://localhost:3001`.

---

## How to Execute Tests

* Unit and integration tests can be run with:

```bash
npm test
```

* Tests are located in the `tests/` directory, covering use-cases, repositories, and endpoints.

---

## API Endpoints

### Routes

| Method | Endpoint               | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| GET    | `/routes`              | Fetch all routes                   |
| POST   | `/routes/:id/baseline` | Set a route as baseline            |
| GET    | `/routes/comparison`   | Compare baseline with other routes |



### Compliance

| Method | Endpoint                  | Description                          |
| ------ | ------------------------- | ------------------------------------ |
| GET    | `/compliance/cb`          | Compute CB for a ship and year       |
| GET    | `/compliance/adjusted-cb` | Get CB after applying banked surplus |

**Example URL**

### Banking

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/banking/records` | Get banked records for a ship/year |
| POST   | `/banking/bank`    | Bank positive CB                   |
| POST   | `/banking/apply`   | Apply banked surplus               |

### Pooling

| Method | Endpoint | Description                                     |
| ------ | -------- | ----------------------------------------------- |
| POST   | `/pools` | Create a pool of ships, validate CB allocations |


## Sample Responses / Screenshots

*Add screenshots of Postman requests/responses or example JSON here.*

![](images/get-banking-bank.png)
![](images/get-banking-records.png)
![](images/get-compliance-adjust.png)
![](images/get-compliance-adjusted-cb.png)
![](images/get-route.png)
![](images/get-route-comparison.png)
![](images/get-route-comparison-2.png)
![](images/post-banking-apply.png)
![](images/post-pools-1.png)
![](images/post-pools-2.png)
![](images/post-route-baseline.png)




## FRONTEND


## Overview

The frontend is a React + TypeScript dashboard for FuelEU Maritime compliance.  
It implements the same **Hexagonal Architecture** pattern as the backend.

Technologies:
- React + TypeScript
- TailwindCSS
- Recharts
- Axios
- Ports & Adapters Architecture

---

## Frontend Architecture

src/
  core/
    domain/        
    application/  
    ports/        
  adapters/
    ui/            
    infrastructure/
      api/         
  shared/          

✅ Core = Pure logic  
✅ UI = React components & hooks  
✅ Infrastructure = API clients  

---

## Features

### 1. Routes Tab
- Fetches /routes
- Shows columns:
  routeId, vesselType, fuelType, year, ghgIntensity, fuelConsumption, distance, totalEmissions
- Filters:
  vesselType, fuelType, year
- Set baseline: POST /routes/:routeId/baseline

---

### 2. Compare Tab
- Fetches `/routes/comparison`
- Target: **89.3368 gCO2e/MJ**
- percentDiff = ((comparison / baseline) - 1) * 100
- Shows:
  Baseline vs comparison
  % difference
  Compliance ✅ / ❌
- Includes Recharts graph

---

### 3. Banking Tab (Fuel EU Article 20)
- Fetch CB: GET /compliance/cb?year=YYYY
- Bank surplus: POST /banking/bank
- Apply surplus: POST /banking/apply
- KPIs:
  cb_before, applied, cb_after
- Actions disabled if CB <= 0

---

### 4. Pooling Tab (Fuel EU Article 21)
- Fetch adjusted CB: GET /compliance/adjusted-cb?year=YYYY
- Create pool: POST /pools
- Validations:
  Sum(adjustedCB) >= 0
  Deficit ships cannot exit worse
  Surplus ships cannot go negative
- Shows:
  CB before/after
  Pool validity (green/red)

---

## Frontend Setup

cd frontend
npm install

.env:
VITE_API_URL=http://localhost:3001

npm run dev

Frontend runs at:
http://localhost:5173

---

## Build Commands

npm run build
npm run preview

---
## Screenshots
![](images/1.png)
![](images/2.png)
![](images/3.png)
![](images/4.png)


