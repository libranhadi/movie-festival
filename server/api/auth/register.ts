import { defineEventHandler, readBody } from 'h3';
import { useSupabase } from "~/utils/supabase";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {

  const { email, password, user_level = 'User' } = await readBody(event);
  const config = useRuntimeConfig();
  const supabase = useSupabase()

  const { data: existingUser, error: checkError } = await supabase
    .from("users") 
    .select("email")
    .eq("email", email)
    .limit(1) 
    .maybeSingle();
    

  if (checkError && checkError.message !== "No rows found") {
    return { success: false, message: checkError.message };
  }

  if (existingUser) {
    return { success: false, message: "Email already registered." };
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  const { data, error } = await supabase.from("users").insert([
      { email, password: hashedPassword, user_level },
  ]);

  if (error) {
    return { success: false, message: error.message };
  }

  const token = jwt.sign(
    { email, user_level },
    config.jwt_secret,
    { expiresIn: "7d" }
  );

  return {
    success: true,
    message: "User registered successfully.",
    token : token,
    user : {email, user_level}
  };
});