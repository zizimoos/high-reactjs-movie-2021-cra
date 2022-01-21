import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  return movies.map((movie) => (
    <div key={movie.id}>
      <img src={movie.medium_cover_image} alt={movie.title} />
      <div>
        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
      </div>
      <ul>
        {movie.genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
      <p>summary : {movie.summary}</p>
    </div>
  ));
};

export default MovieList;
