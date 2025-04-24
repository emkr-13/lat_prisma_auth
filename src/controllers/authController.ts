import prisma from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { sendResponse } from "../utils/responseHelper";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validasi input
    const { username, password } = req.body;

    if (!username || !password) {
      sendResponse(res, 400, "Username and password are required");
    }

    // Cari user
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) sendResponse(res, 401, "Invalid credentials");

    // Verifikasi password
    if (!user || !user.password) {
      sendResponse(res, 401, "Invalid credentials");
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      sendResponse(res, 401, "Invalid credentials");
      return;
    }

    // Generate token
    const authToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: parseInt(process.env.AUTH_TOKEN_EXP!, 10),
    });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: parseInt(process.env.REFRESH_TOKEN_EXP!, 10),
    });

    // Update refresh token di database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
        refreshTokenExp: new Date(
          Date.now() + parseInt(process.env.REFRESH_TOKEN_EXP!) * 1000
        ),
      },
    });

    sendResponse(res, 200, "Login successful", {
      token: authToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Unexpected error during login:", error);
    sendResponse(res, 500, "An unexpected error occurred", error);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ambil user ID dari request (dari middleware authenticate)
    const userId = (req as any).user.id;

    await prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
        refreshTokenExp: null,
      },
    });

    sendResponse(res, 200, "Logout successful");

    sendResponse(res, 200, "Logout successful");
  } catch (error) {
    console.error("Error during logout:", error);
    sendResponse(res, 500, "Logout failed", error);
  }
};
