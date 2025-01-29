import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <div className={css.Navigation}>
      <NavLink
        className={({ isActive }) => (isActive ? css.active : "")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? css.active : "")}
        to="/movies"
      >
        Movies
      </NavLink>
    </div>
  );
}
