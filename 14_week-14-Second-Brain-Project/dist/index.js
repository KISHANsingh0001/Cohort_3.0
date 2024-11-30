"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const db_1 = require("./db");
const config_1 = require("./config");
const app = (0, express_1.default)();
// Middleware for parsing JSON body
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect("mongodb+srv://kishansinghthakur27:GuQ4OM7AiKlAO5I8@cluster0.k0ymi.mongodb.net/Second-brain")
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));
//@ts-ignore
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requireBody = zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string()
            .min(3).
            max(20)
            .refine((password) => /[A-Z]/.test(password), {
            message: "Password must have at least one uppercase letter",
        })
            .refine((password) => /[a-z]/.test(password), {
            message: "Password must have at least one lowercase letter",
        })
            .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
            message: "Password must have at least one special character",
        }),
    });
    const requireBodyWithSafeParse = requireBody.safeParse(req.body);
    if (!requireBodyWithSafeParse.success) {
        return res.status(411).json({
            msg: "Invalid Format",
            error: requireBodyWithSafeParse.error.errors,
        });
    }
    const { email, password } = requireBodyWithSafeParse.data;
    try {
        // Check if user already exists
        const userExist = yield db_1.User.findOne({ email });
        if (userExist) {
            return res.status(403).json({
                msg: "User Already exists with this email",
            });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        // Create the user
        yield db_1.User.create({
            email,
            password: hashedPassword,
        });
        res.status(200).json({
            msg: "You are Signed Up",
        });
    }
    catch (e) {
        console.error("Error during signup:", e);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
}));
//@ts-ignore
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield db_1.User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                msg: "Invalid credentials",
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatch) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_PASSWORD, {
                expiresIn: "1h",
            });
            res.status(200).json({
                success: true,
                msg: "You are signed in",
                token,
            });
        }
        else {
            res.status(403).json({
                success: false,
                msg: "Invalid credentials",
            });
        }
    }
    catch (e) {
        console.error("Error during signing:", e);
        res.status(500).json({
            success: false,
            msg: "Internal server error",
        });
    }
}));
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
