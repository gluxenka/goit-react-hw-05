import { Circles } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.Loader}>
      <Circles height="80" width="80" color="#4fa94d" visible={true} />
    </div>
  );
}
