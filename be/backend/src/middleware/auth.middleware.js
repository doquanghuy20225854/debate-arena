const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
    try {
        const auth = req.headers.authorization || "";
        const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
        if (!token) return res.status(401).json({ message: "Thiếu token" });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn" });
    }
};
