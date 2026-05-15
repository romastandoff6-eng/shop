const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// подключение к MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("DB error:", err));

// тестовый роут
app.get("/", (req, res) => {
    res.send("API + MongoDB работает");
});

// пример схемы
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const User = mongoose.model("User", UserSchema);

// создать пользователя
app.post("/users", async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// получить пользователей
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
});