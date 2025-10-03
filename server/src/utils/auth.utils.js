import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function generateAccessToken(payload) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}
