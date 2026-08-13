import { useEffect } from "react";
import "./PageLoader.css";

function PageLoader({ message = "Loading..." }) {
  return (
    <div className="page-loader">
      <div className="loader-content">
        <div className="loader-ring">
          <div></div><div></div><div></div><div></div>
        </div>
        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
}

export default PageLoader;
