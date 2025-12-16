// src/app.js
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use(
    rateLimit({
        windowMs: 60 * 1000,
        limit: 120,
    })
);

app.get("/health", (req, res) => res.json({ ok: true }));

// Giữ /auth cho tương thích cũ
app.use("/auth", authRoutes);

// Thêm /api/auth để khớp FE đang gọi /api/auth/*
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
