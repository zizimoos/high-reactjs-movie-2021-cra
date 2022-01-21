import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import styles from "./Home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=year"
      )
    ).json();

    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default Home;
