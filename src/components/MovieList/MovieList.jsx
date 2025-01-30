import { Link, useLocation } from "react-router-dom";

export default function MovieList({ items }) {
  const location = useLocation();

  return (
    <ul>
      {items.map(({ id, title }, index) => (
        <li key={id}>
          <Link to={`/movies/${id}`} state={location}>
            {index + 1}. {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
