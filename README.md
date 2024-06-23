# Perusahaan A Service

Perusahaan A Service is an API that allows for managing employee data, marking attendance, requesting leaves, and generating reports.

## Features

- Register and login employees
- CRUD operations on employee profiles
- Mark attendance
- Request leaves
- Approve or reject leave requests (admin only)
- Generate attendance and leave reports

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Swagger**: API documentation.
- **JWT**: JSON Web Tokens for authentication.
- **Axios**: Promise-based HTTP client.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed.
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running.

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/mrsyafapri/assist-perusahaan-a.git
   cd assist-perusahaan-a
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Create a `.env` file in the root directory and add the following configuration**:

   ```env
   DATABASE_URL=mongodb://localhost:27017/perusahaan-a
   PORT=3000
   SECRET_TOKEN=secret_key
   JWT_EXPIRES_IN=1h
   ABSENSI_SERVICE=http://localhost:3005/api/v1/absensi
   ```

4. **Start the server**:

   ```sh
   npm start
   ```

5. **Access the API documentation**:
   Open your browser and go to [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## API Endpoints

### Register a New Employee

**Endpoint:** `/api/v1/employee/register`

**Method:** `POST`

**Description:** Registers a new employee.

**Request Body:**

```json
{
  "name": "John Doe",
  "position": "Software Engineer",
  "email": "john.doe@gmail.com",
  "password": "password123",
  "isAdmin": false
}
```

**Responses:**

- `201`: Employee registered successfully.
- `400`: Invalid data or email already exists.
- `500`: Internal server error.

### Log In an Employee

**Endpoint:** `/api/v1/employee/login`

**Method:** `POST`

**Description:** Logs in an employee.

**Request Body:**

```json
{
  "email": "john.doe@gmail.com",
  "password": "password123"
}
```

**Responses:**

- `200`: Logged in successfully.
- `400`: Incorrect email or password.
- `500`: Internal server error.

### Get Employee Profile

**Endpoint:** `/api/v1/employee/profile`

**Method:** `GET`

**Description:** Retrieves the profile of the logged-in employee.

**Headers:**

- `Authorization: Bearer <token>`

**Responses:**

- `200`: Employee details fetched successfully.
- `404`: Employee not found.
- `500`: Internal server error.

### Update Employee Profile

**Endpoint:** `/api/v1/employee/profile`

**Method:** `PUT`

**Description:** Updates the profile of the logged-in employee.

**Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "name": "John Doe",
  "position": "Software Engineer",
  "email": "john.doe@gmail.com",
  "password": "password123",
  "isAdmin": false
}
```

**Responses:**

- `200`: Employee updated successfully.
- `400`: Invalid data.
- `404`: Employee not found.
- `500`: Internal server error.

### Delete Employee Profile

**Endpoint:** `/api/v1/employee/profile`

**Method:** `DELETE`

**Description:** Deletes the profile of the logged-in employee.

**Headers:**

- `Authorization: Bearer <token>`

**Responses:**

- `204`: Employee deleted successfully.
- `404`: Employee not found.
- `500`: Internal server error.

### Mark Attendance

**Endpoint:** `/api/v1/employee/mark`

**Method:** `POST`

**Description:** Marks attendance for the logged-in employee.

**Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "date": "2024-06-23",
  "status": "present"
}
```

**Responses:**

- `201`: Attendance marked successfully.
- `400`: Invalid data or attendance already marked for this date.
- `500`: Internal server error.

### Request Leave

**Endpoint:** `/api/v1/employee/leave`

**Method:** `POST`

**Description:** Requests leave for the logged-in employee.

**Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "startDate": "2024-06-23",
  "endDate": "2024-06-25",
  "reason": "Family vacation"
}
```

**Responses:**

- `201`: Leave request submitted successfully.
- `400`: Invalid data or end date cannot be earlier than start date.
- `409`: Leave request conflicts with an existing leave request.
- `500`: Internal server error.

### Update Leave Request Status

**Endpoint:** `/api/v1/employee/leave/{id}/status`

**Method:** `PUT`

**Description:** Updates the status of a leave request by admin.

**Headers:**

- `Authorization: Bearer <token>`

**Parameters:**

- `id` (path): Leave request ID.

**Request Body:**

```json
{
  "status": "approved"
}
```

**Responses:**

- `200`: Leave request status updated successfully.
- `400`: Invalid status.
- `403`: Unauthorized - Only admin can perform this action.
- `404`: Leave request not found.
- `500`: Internal server error.

### Generate Attendance and Leave Report

**Endpoint:** `/api/v1/employee/report?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

**Method:** `GET`

**Description:** Generates a report of attendance and leave for a specific period.

**Headers:**

- `Authorization: Bearer <token>`

**Query Parameters:**

- `startDate` (query): Start date for the report (format: `YYYY-MM-DD`).
- `endDate` (query): End date for the report (format: `YYYY-MM-DD`).

**Responses:**

- `200`: Report generated successfully.
- `400`: Invalid data or start date and end date are required.
- `500`: Internal server error.

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=mongodb://localhost:27017/perusahaan-a
PORT=3000
SECRET_TOKEN=secret_key
JWT_EXPIRES_IN=1h
ABSENSI_SERVICE=http://localhost:3005/api/v1/absensi
```
