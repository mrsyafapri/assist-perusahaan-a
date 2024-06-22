const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();

const swaggerDocs = require('./swagger');
const employeeRoutes = require('./routes/employee');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);

const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error)
})
database.once("connected", () => {
    console.log("Database connected")
})

router.get("/", (req, res) => {
    res.send("Welcome to the Perusahaan A API");
});

router.use('/employee', employeeRoutes);

app.use("/api/v1", router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(port, () => {
    console.log(`Perusahaan A API: listening on port ${port}`);
    console.log(`API documentation available at http://localhost:${port}/api-docs`);
});