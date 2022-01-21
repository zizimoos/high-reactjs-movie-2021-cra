import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    console.log(movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <div>
            <img
              src={movie?.medium_cover_image}
              alt="movie"
              className={styles.img}
            />
          </div>
          <h2>Rating</h2>
          <p>{movie.rating}</p>
          <h2>Download Count</h2>
          <p>{movie.download_count}</p>
          <h2>imdb_code</h2>
          <p>{movie.imdb_code}</p>
          <h2>Genres</h2>
          <p>
            {movie.genres.map((m) => (
              <li>{m}</li>
            ))}
          </p>
          <h2>Description</h2>
          <p>{movie.description_full}</p>
          <h2>Torrents</h2>
          <p>
            {movie.torrents.map((seed) => {
              return (
                <div>
                  <p>{seed.quality}</p>
                  <p>{seed.url}</p>
                  <p>{seed.hash}</p>
                </div>
              );
            })}
          </p>
        </div>
      )}
    </div>
  );
};
export default Detail;
