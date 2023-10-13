import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "constants/Constants";
import Styles from "./Banner.module.css";
import { memo } from "react";
import { images } from "utils/exportImagesUtils/images";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`container ${Styles.bannerSection} d-flex align-items-center`}
      >
        <div className="row gy-3 ">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className={`${Styles.bannerText} `}>
              <h1 className={Styles.bannerH1}>{CONSTANTS.HOME_HEADER}</h1>
              <p>{CONSTANTS.HOME_PARAGRAPH}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 d-flex align-items-end justify-content-end">
            <button
              className={`${Styles.btnExplore} btn btn-primary bt-banner-w`}
              type="button"
              onClick={() => navigate("/conferences")}
            >
              Explore <img src={images.searchIconLight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Banner);
