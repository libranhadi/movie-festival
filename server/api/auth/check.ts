import jwt from "jsonwebtoken";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  
  const config = useRuntimeConfig();
  const authHeader = getHeader(event, "authorization");
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwt_secret);
    return { user: decoded };
  } catch (error) {
    throw createError({ statusCode: 403, statusMessage: "Invalid Token" });
  }
});