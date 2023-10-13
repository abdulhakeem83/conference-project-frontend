import { Link } from "react-router-dom";
import Styles from "./CardPlaceholder.module.css";
const CardPlaceHolders = () => (
  <>
    <div className="container">
      <div className={`row d-flex gy-3  ${Styles.scrollBar}  flex-nowrap`}>
        <div className={`col-lg-3 col-md-9 col-9 ${Styles.sectionCards}`}>
          <div className={`${Styles.card} aria-hidden="true" shadow  h-100 `}>
            <span
              className={`${Styles.cardImgTop} placeholder col-6 h-50 w-100`}
            ></span>
            <div className="card-body">
              <h5 className={` card-title placeholder-glow `}>
                <span className="w-100 p-2  placeholder col-6"></span>
              </h5>
              <div className={`${Styles.cardText}  mt-3 `}>
                <span className="  placeholder col-6"></span>
              </div>
              <hr></hr>
              <div className={`${Styles.cardTextCity}  mt-3 `}>
                <span className="  placeholder col-6"></span>
              </div>
              <div className={` ${Styles.cardTextDate} mt-3 `}>
                <span className="w-50 p-3  placeholder col-6"></span>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-lg-3 col-md-9 col-9 ${Styles.sectionCards}`}>
          <div className={`${Styles.card} aria-hidden="true" shadow  h-100 `}>
            <span
              className={`${Styles.cardImgTop} placeholder col-6 h-50 w-100`}
            ></span>
            <div className="card-body">
              <h5 className={` card-title placeholder-glow `}>
                <span className="w-100 p-2  placeholder col-6"></span>
              </h5>
              <div className={`${Styles.cardText}  mt-3 `}>
                <span className="  placeholder col-6"></span>
              </div>
              <hr></hr>
              <div className={`${Styles.cardTextCity}  mt-3 `}>
                <span className="  placeholder col-6"></span>
              </div>
              <div className={` ${Styles.cardTextDate} mt-3 `}>
                <span className="w-50 p-3  placeholder col-6"></span>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-lg-3 col-md-9 col-9 ${Styles.sectionCards}`}>
          <div className={`${Styles.card} aria-hidden="true" shadow  h-100 `}>
            <span
              className={`${Styles.cardImgTop} placeholder col-6 h-50 w-100`}
            ></span>
            <div className="card-body">
              <h5 className={` card-title placeholder-glow `}>
                <span className="w-100 p-2  placeholder col-6"></span>
              </h5>
              <div className={`${Styles.cardText}  mt-3 `}>
                <span className="  placeholder col-6"></span>
              </div>
              <hr></hr>
              <div className={`${Styles.cardTextCity}  mt-3 `}>
                <span className="  placeholder col-6"></span>
              </div>
              <div className={` ${Styles.cardTextDate} mt-3 `}>
                <span className="w-50 p-3  placeholder col-6"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2  col-md-6 col-9 p-2">
          <Link to="/conferences" className={`${Styles.view}`}>
            <div className={`${Styles.viewAll}  shadow h-100`}>
              <h2>View all</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default CardPlaceHolders;
