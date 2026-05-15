const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API работает");
});

app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "Roman" },
        { id: 2, name: "Alex" }
    ]);
});

app.post("/users", (req, res) => {
    console.log(req.body);

    res.json({
        message: "Пользователь создан"
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});