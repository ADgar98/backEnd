const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRouters = require("./routes/users");

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose
.connect("mongodb://localhost:27017/backend", {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
console.log("✅ Connected to MongoDB");
})
.catch((error) => {
console.error("❌ MongoDB connection error:", error.message);
});

const { PORT = 3003, API_URL = " http://127.0.0.1 " } = process.env;

app.get("/", (request, response) => {
response.status(200);
response.send("Hello world");
});

app.post((request, response) => {
response.status(200);
response.send("Hello Post");
});

app.use(userRouters);

app.listen(PORT, () => {
console.log(`сервер запущен по адресу ${API_URL}:${PORT}`);
});