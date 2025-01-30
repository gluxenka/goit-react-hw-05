import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdPerson } from "react-icons/md";

import css from "./MovieCast.module.css";

import {
  getImageUrl,
  getMovieExtraInfo,
} from "../../data/themoviedb-api/themoviedb.js";
import Loader from "../Loader/Loader.jsx";

export default function MovieCast() {
  const [castList, setCastList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  const fetchMovieCast = async () => {
    setLoading(true);
    const { cast } = await getMovieExtraInfo(movieId, "credits");

    setCastList(cast);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieCast(movieId);
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ul className={css.MovieCast}>
      {castList.map((cast) => (
        <li key={cast.id}>
          {cast.profile_path ? (
            <img
              className={css.MovieCastImage}
              alt="Person photo"
              src={getImageUrl(cast.profile_path)}
            />
          ) : (
            <MdPerson className={css.MovieCastNoProfileImage} />
          )}

          <h4>{cast.name}</h4>
        </li>
      ))}
    </ul>
  );
}
