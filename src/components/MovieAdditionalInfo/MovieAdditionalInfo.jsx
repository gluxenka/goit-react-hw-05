import css from "./MovieAdditionalInfo.module.css";
import { Link, useParams } from "react-router-dom";

export default function MovieAdditionalInfo() {
  const { movieId } = useParams();

  return (
    <div className={css.MovieAdditionalInfo}>
      <h2>Additional information</h2>
      <ul>
        <li>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </li>
      </ul>
    </div>
  );
}
