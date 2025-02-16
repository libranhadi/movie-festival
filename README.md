# Movies Festival Nuxt JS & Supabase
This project is a Nuxt.js application built with TypeScript, Supabase, JWT, Bcrypt, and Pinia. It includes a database schema for users, movies, vote_movies, and watch_movies. The application allows users to create movies, vote on movies, and mark movies as watched. Additionally, it demonstrates how to store video files in Supabase and use the generated URL when creating a movie.

Features
User Authentication: JWT-based authentication with Supabase.

Movie Management: Create, vote, and mark movies as watched.

Video Storage: Store video files in Supabase and use the URL in the movie creation process.

State Management: Pinia for state management.

## Setup

Clone Repository : 
```bash
git clone https://github.com/libranhadi/movie-festival.git
cd movie-festival
```

Make sure to install dependencies:
```bash
# npm
npm install
```
## Development Server
Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## ENV

```bash
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-public-key
JWT_SECRET=your-jwt-secret
```
## Setup Supabase
Create a new project in Supabase.

Get your Supabase URL and public API key.

Setup database until development to disable row level security.

Create the references tables in your Supabase database:

```bash
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_level VARCHAR(10) NOT NULL,
);

CREATE TABLE movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration VARCHAR(8),
  artist VARCHAR(255),
  genre VARCHAR(255),
  url TEXT NOT NULL,
);

CREATE TABLE vote_movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  movie_id UUID REFERENCES movies(id),
);

CREATE TABLE watch_movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  movie_id UUID REFERENCES movies(id),
);
```

Notes : during development cannot access the database make the database disable row level security first.

```bash
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') 
    LOOP
        EXECUTE 'GRANT SELECT, INSERT, UPDATE, DELETE ON public.' || r.tablename || ' TO anon, authenticated, service_role';
    END LOOP;
END $$;
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
