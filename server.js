require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const webRoutes = require("./routes/webRoutes");
const aiController = require("./controllers/aiController"); // ទាញយក Controller

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/", webRoutes); // ប្រើ Routes ដែលបានញែកចេញ

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("✅ User connected: " + socket.id);

    socket.on("review_code", async (data) => {
        try {
            const result = await aiController.reviewCode(data); // ហៅមកប្រើពី Controller
            socket.emit("review_result", result);
        } catch (e) { socket.emit("error_occured", e.message); }
    });

    socket.on("ask_culture", async (data) => {
        try {
            const result = await aiController.askCulture(data);
            socket.emit("culture_result", result);
        } catch (e) { socket.emit("error_occured", e.message); }
    });

    socket.on("study_assist", async (data) => {
        try {
            const result = await aiController.studyAssist(data);
            socket.emit("study_result", result);
        } catch (e) { socket.emit("error_occured", e.message); }
    });
});

server.listen(3000, () => console.log("🚀 Server is flying at http://localhost:3000"));