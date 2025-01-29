import { useMemo } from "react";

import css from "./MovieOverview.module.css";

import { getImageUrl } from "../../data/themoviedb-api/themoviedb.js";

export default function MovieOverview({ details }) {
  const {
    title,
    poster_path: posterBasePath,
    overview,
    vote_average: voteAverage,
    genres,
  } = details;

  const score = useMemo(() => Math.round(voteAverage * 10), [voteAverage]);

  const posterUrl = getImageUrl(posterBasePath, "w500");

  return (
    <div className={css.MovieOverview}>
      <img
        className={css.MovieOverviewImage}
        alt="Movie poster"
        src={posterUrl}
      />

      <div className={css.MovieOverviewDetailsContainer}>
        <h1>{title}</h1>

        <p>User Score: {score}%</p>

        <h3>Overview</h3>
        <p>{overview}</p>

        <h3>Genres</h3>
        <span className={css.MovieOverviewGenresSection}>
          {genres.map(({ id, name }) => (
            <span key={id}>{name}</span>
          ))}
        </span>
      </div>
    </div>
  );
}
