import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <dib>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie?.large_cover_image} alt="movie" />
        </div>
      )}
    </dib>
  );
};
export default Detail;
