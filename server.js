const express = require("express");
const routes = require("./routes");
const connectDB = require("./config/dbConnection");

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

connectDB();

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`App running on localhost port ${PORT}`);
});
