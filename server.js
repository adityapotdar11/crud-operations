const express = require("express");
const mongoose = require("mongoose");
const { databaseURL } = require("./config/config");
const { createUser } = require("./controllers/userController");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

mongoose.Promise = global.Promise;

mongoose
    .connect(databaseURL)
    .then(() => {
        console.log("Database Connected Successfully!!!");
    })
    .catch((err) => {
        console.log("Could not connect to the database", err.message);
        process.exit();
    });

app.use("/", userRoutes);

app.listen(PORT, () => {
    console.log(`App running on localhost port ${PORT}`);
});
