import { useState } from "react";
import "./App.css";

const initialMovies = [
  {
    id: 118836,
    title: "Interstellar",
    genre: "Sci-Fi",
    rating: "9.5",
    poster: "https://dummyimage.com/80x80/1c1c24/fff&text=Interstellar",
    watched: false,
  },
  {
    id: 933372,
    title: "The Dark Knight",
    genre: "Action",
    rating: "9.0",
    poster: "https://dummyimage.com/80x80/1c1c24/fff&text=Dark+Knight",
    watched: false,
  },
  {
    id: 499476,
    title: "Inception",
    genre: "Sci-Fi",
    rating: "8.8",
    poster: "https://dummyimage.com/80x80/1c1c24/fff&text=Inception",
    watched: false,
  },
];

export default function App() {
  const [movies, setMovies] = useState(initialMovies);

  function handleAddMovie(newMovie) {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  }

  function handleWatched(id) {
    setMovies((movies) =>
      movies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie,
      ),
    );
  }

  function handleDelete(id) {
    setMovies((movies) => movies.filter((movie) => movie.id !== id));
  }

  return (
    <div className="app">
      <Title />
      <Form onAddMovie={handleAddMovie} />
      <MovieList
        movies={movies}
        onToggleWatched={handleWatched}
        onDelete={handleDelete}
      />
      <Ratings movies={movies} />
    </div>
  );
}

function Title() {
  return (
    <div className="header">
      <h1>🍿 Movie tracker</h1>
    </div>
  );
}

function Form({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !genre || !rating) return;

    const id = crypto.randomUUID();

    const newMovie = {
      title,
      genre,
      rating,
      id,
      watched: false,
      poster: `https://dummyimage.com/80x80/1c1c24/fff&text=${encodeURIComponent(title)}`,
    };

    onAddMovie(newMovie);

    setTitle("");
    setGenre("");
    setRating("");
  }

  return (
    <form className="form-add-movie" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="movie"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Select genre</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Action">Action</option>
        <option value="Musical">Musical</option>
        <option value="Fantasy">Fantasy</option>
      </select>

      <input
        type="text"
        placeholder="0 - 10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button className="button button-add">Add</button>
    </form>
  );
}

function MovieList({ movies, onToggleWatched, onDelete }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.id}
          onToggleWatched={onToggleWatched}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onToggleWatched, onDelete }) {
  return (
    <li className="movie">
      <img src={movie.poster} alt={movie.title} />

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <span className="genre">{movie.genre}</span>
        <div className="rating">
          <i>★</i>
          <strong>{movie.rating}</strong>
          <span>/ 10</span>
        </div>
      </div>

      <div className="movie-actions">
        <button
          className="button button-watched"
          onClick={() => onToggleWatched(movie.id)}
        >
          {movie.watched ? "✓ Watched" : "Watched"}
        </button>
        <button
          className="button button-delete"
          onClick={() => onDelete(movie.id)}
        >
          🗑
        </button>
      </div>
    </li>
  );
}

function Ratings({ movies }) {
  const avgRating = movies.length
    ? (
        movies.reduce((acc, m) => acc + Number(m.rating), 0) / movies.length
      ).toFixed(2)
    : 0;

  const moviesWatched = movies.filter((m) => m.watched).length;

  return (
    <footer className="stats">
      <div className="stat">
        <div className="stat-icon">★</div>
        <div className="stat-text">
          <p>Average Rating</p>
          <h4>
            {avgRating} <span>/ 10</span>
          </h4>
        </div>
      </div>

      <div className="divider"></div>

      <div className="stat">
        <div className="stat-icon">🎬</div>
        <div className="stat-text">
          <p>Movies Watched</p>
          <h4>{moviesWatched}</h4>
        </div>
      </div>

      <div className="divider"></div>

      <div className="stat">
        <div className="stat-icon">📦</div>
        <div className="stat-text">
          <p>Total Movies</p>
          <h4>{movies.length}</h4>
        </div>
      </div>
    </footer>
  );
}
