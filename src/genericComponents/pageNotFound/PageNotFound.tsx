import { useNavigate } from "react-router-dom";
import pageStyle from "./PageNotFound.module.css";

const Pagenotfound = () => {
  const navigate = useNavigate();
  return (
    <div className={`container mt-5 ${pageStyle.pagenot}`}>
      <div className="row pt-5">
        <div className="col-md-12 text-center p-5">
          <h1> 404 </h1>
          <h2>Page not found</h2>
          <p>
            Sorry, the page that you are looking for doesn&apos;t or has been
            moved{" "}
          </p>
          <button
            className="btn btn-primary px-5 mt-lg-4"
            type="button"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagenotfound;
