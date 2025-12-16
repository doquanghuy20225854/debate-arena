const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const registerSchema = z
    .object({
        firstName: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
        username: z.string().min(3, "Username tối thiểu 3 ký tự"),
        email: z.string().email("Email không hợp lệ"),
        password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
    })
    .passthrough();

const loginSchema = z
    .object({
        username: z.string().min(1, "Thiếu username/email"),
        password: z.string().min(1, "Thiếu mật khẩu"),
    })
    .passthrough();

function signToken(user) {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
    return jwt.sign(
        { sub: user.id, email: user.email, username: user.username || null },
        secret,
        { expiresIn }
    );
}

exports.register = async (req, res, next) => {
    try {
        const body = registerSchema.parse(req.body);

        // check trùng email hoặc username
        const existing = await prisma.user.findFirst({
            where: {
                OR: [{ email: body.email }, { username: body.username }],
            },
            select: { id: true },
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Email hoặc username đã tồn tại",
            });
        }

        const passwordHash = await bcrypt.hash(body.password, 10);
        const name = [body.firstName, body.lastName].filter(Boolean).join(" ") || null;

        const user = await prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                name,
                password: passwordHash,
            },
            select: { id: true, email: true, username: true, name: true, createdAt: true },
        });

        return res.status(201).json({
            success: true,
            message: "Đăng ký thành công",
            data: user,
        });
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json({ success: false, message: err.errors?.[0]?.message });
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const body = loginSchema.parse(req.body);
        const identifier = body.username.trim();

        const user = identifier.includes("@")
            ? await prisma.user.findUnique({ where: { email: identifier } })
            : await prisma.user.findUnique({ where: { username: identifier } });

        if (!user) {
            return res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
        }

        const ok = await bcrypt.compare(body.password, user.password);
        if (!ok) {
            return res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
        }

        const token = signToken(user);

        return res.json({
            success: true,
            data: {
                token,
                user: { id: user.id, email: user.email, username: user.username, name: user.name },
            },
        });
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ" });
        }
        next(err);
    }
};

exports.me = async (req, res, next) => {
    try {
        const userId = req.user.sub;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, username: true, name: true, createdAt: true },
        });

        return res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res) => {
    // JWT stateless: FE chỉ cần xoá token
    return res.json({ success: true });
};
