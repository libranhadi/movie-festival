import { supabase } from "~/utils/supabase";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const query = getQuery(event);

  if (method === "GET") {
    const { data, error } = query.id
      ? await supabase.from("users").select("*").eq("id", query.id)
      : await supabase.from("users").select("*");

    if (error) throw createError({ statusCode: 500, message: error.message });
    return data;
  }

  if (method === "POST") {
    const body = await readBody(event);
    const { data, error } = await supabase.from("users").insert([
      {
        title: body.title,
        description: body.description,
        duration: body.duration,
        artist: body.artists,
        genre: body.genres,
        url: body.watch_url,
      },
    ]);

    if (error) throw createError({ statusCode: 500, message: error.message });
    return { message: "Movie created successfully", data };
  }

  if (method === "PUT") {
    const body = await readBody(event);
    const { data, error } = await supabase.from("users").update({
      title: body.title,
      description: body.description,
      duration: body.duration,
      artist: body.artists,
      genre: body.genres,
      url: body.watch_url,
    }).eq("id", body.id);

    if (error) throw createError({ statusCode: 500, message: error.message });
    return { message: "Movie updated successfully", data };
  }

  if (event.node.req.method === "DELETE") {
    const id =  query.id
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      throw createError({ statusCode: 500, message: error.message });
    }

    return { message: "Movie deleted successfully" };
  }

  throw createError({ statusCode: 405, message: "Method not allowed" });
});
