import db from "../config/db";
import { Request, Response } from "express";
import { sendResponse } from "../utils/responseHelper";

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id; // Ambil user ID dari token yang sudah diverifikasi

    if (!userId) {
      sendResponse(res, 400, "Unauthorized");
    }
    // Ambil data user dari database
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      sendResponse(res, 404, "User not found");
      return;
    }
    // Kirim response
    sendResponse(res, 200, "Profile retrieved successfully", user);
  } catch (error) {
    console.error("Unexpected error during getProfile:", error);
    sendResponse(res, 500, "An unexpected error occurred", error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id; // Ambil user ID dari token yang sudah diverifikasi

    if (!userId) {
      sendResponse(res, 400, "Unauthorized");
    }
    // Ambil data user dari database
    const { name } = req.body;
    const user = await db.user.update({
      where: { id: userId },
      data: { name },
      select: {
        username: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      sendResponse(res, 404, "User not found");
      return;
    }
    // Kirim response
    sendResponse(res, 200, "Profile updated successfully", user);
  } catch (error) {
    console.error("Unexpected error during updateProfile:", error);
    sendResponse(res, 500, "An unexpected error occurred", error);
  }
};
