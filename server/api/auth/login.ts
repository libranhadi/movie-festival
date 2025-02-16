import { defineEventHandler, readBody } from 'h3';
import { useSupabase } from "~/utils/supabase";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const supabase = useSupabase()
  const config = useRuntimeConfig();

  const { data: user, error } = await supabase
    .from("users")
    .select("email, password, user_level")
    .eq("email", email)
    .limit(1) 
    .maybeSingle(); 


  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, message: "Invalid email or password." };
  }
  const authemail = user.email
  const authlevel = user.user_level

  const token = jwt.sign(
      { authemail, authlevel },
      config.jwt_secret,
      { expiresIn: "7d" }
    );

  return { success: true, message: "Login successful.", token: token, user : {authemail, authlevel}};
});
