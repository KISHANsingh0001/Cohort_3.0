import express, { request, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { User } from "./db";
import { JWT_PASSWORD } from "./config";

const app = express();

// Middleware for parsing JSON body
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://kishansinghthakur27:GuQ4OM7AiKlAO5I8@cluster0.k0ymi.mongodb.net/Second-brain")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));
//@ts-ignore
app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const requireBody = z.object({
    email: z.string(),
    password: z.string()
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
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(403).json({
        msg: "User Already exists with this email",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create the user
    await User.create({
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      msg: "You are Signed Up",
    });
  } catch (e) {
    console.error("Error during signup:", e);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});
//@ts-ignore
app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ id: user._id }, JWT_PASSWORD, {
        expiresIn: "1h",
      });

      res.status(200).json({
        success: true,
        msg: "You are signed in",
        token,
      });
    } else {
      res.status(403).json({
        success: false,
        msg: "Invalid credentials",
      });
    }
  } catch (e) {
    console.error("Error during signing:", e);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});