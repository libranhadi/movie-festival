import jwt from "jsonwebtoken";

export async function getUserFromToken(token: string) {
   const tkn = token.split(" ")[1];
    const config = useRuntimeConfig();
   try {
     const decoded = jwt.verify(tkn, config.jwt_secret);
     return { user: decoded };
   } catch (error) {
     throw createError({ statusCode: 403, statusMessage: "Invalid Token" });
   }
}
