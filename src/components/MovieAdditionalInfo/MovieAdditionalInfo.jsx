import css from "./MovieAdditionalInfo.module.css";
import { Link } from "react-router-dom";

export default function MovieAdditionalInfo() {
  return (
    <div className={css.MovieAdditionalInfo}>
      <h2>Additional information</h2>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
    </div>
  );
}
