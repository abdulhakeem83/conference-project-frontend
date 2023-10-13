import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "constants/Constants";
import conferences from "../../../assets/images/conferences-hall.png";
import Styles from "./AboutSection.module.css";
import { memo } from "react";

const AboutSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`container section-padding-tb  ${Styles.sectionAbout} ${Styles.sectionTbP}`}
      >
        <div className="row gy-3">
          <div className="col-lg-6 col-md-12 align-self-center">
            <div className="">
              <h2>{CONSTANTS.HOME_BROWSING}</h2>
              <p>{CONSTANTS.HOME_VARIOUS}</p>
            </div>
            <div className="row gap-3 m-0 pt-4">
              <button
                className={`${Styles.btnsAbout} col-lg-4 col-md-6 col-sm-12 btn btn-primary bt-section-w `}
                type="button"
                onClick={() => navigate("/about")}
              >
                About us
              </button>
              <button
                className={`${Styles.btnsAbout}  col-lg-4 col-md-6 col-sm-12 btn btn-outline-primary bt-section-w `}
                type="button"
                onClick={() => navigate("/conferences")}
              >
                Conferences
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 d-flex justify-content-end">
            <img
              src={conferences}
              className={`${Styles.imgTab} img-fluid float-end`}
              alt="image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AboutSection);
