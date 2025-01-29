import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdPerson } from "react-icons/md";

import css from "./MovieCast.module.css";

import {
  getImageUrl,
  getMovieExtraInfo,
} from "../../data/themoviedb-api/themoviedb.js";

export default function MovieCast() {
  const [castList, setCastList] = useState([]);
  const { movieId } = useParams();

  const fetchMovieCast = async () => {
    const { cast } = await getMovieExtraInfo(movieId, "credits");

    setCastList(cast);
  };

  useEffect(() => {
    fetchMovieCast(movieId);
  }, [movieId]);

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
