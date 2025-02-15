import { supabase } from "~/utils/supabase";

interface QueryParams {
    page?: number;
    itemsPerPage?: number;
    searchQuery?: string;
}
  
export default defineEventHandler(async (event) => {
  let { page = 1, itemsPerPage = 10, searchQuery = '' } : QueryParams = getQuery(event);

  const { data, error, count = 1} : any = await supabase
    .from('movies')
    .select('*', { count: 'exact' })
    .or(`title.ilike.%${searchQuery}%,artist.ilike.%${searchQuery}%,genre.ilike.%${searchQuery}%`)
    .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  return {
    movies: data,
    totalPages: Math.ceil(count / itemsPerPage),
    totalMovies: count
  };
});
