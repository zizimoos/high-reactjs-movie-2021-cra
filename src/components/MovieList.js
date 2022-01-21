import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return movies.map((movie) => (
    <div key={movie.id} className={styles.movie}>
      <Link to={`/movie/${movie.id}`}>
        <img
          src={movie.medium_cover_image}
          alt={movie.title}
          className={styles.movie__img}
        />
      </Link>

      <div className={styles.movie__title}>
        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        <h3 className={styles.movie__year}>{movie.year}</h3>
        <p>
          {movie.summary.length > 235
            ? `${movie.summary.slice(0, 235)}...`
            : movie.summary}
        </p>
        <ul>
          {movie.genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  ));
};

export default MovieList;
