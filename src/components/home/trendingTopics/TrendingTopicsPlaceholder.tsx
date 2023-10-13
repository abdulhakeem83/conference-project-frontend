import Styles from "../trendingTopics/TrendingTopicsPlaceholder.module.css";
const TrendingTopicsPlaceholder = () => (
  <>
    <div className="container">
      <div className={`row ${Styles.cardHieght} `}>
        <div className="col-lg-4 col-md-12 d-flex align-items-stretch">
          <div className={`  ${Styles.topicBox} aria-hidden="true"`}>
            <div
              className={`  ${Styles.topicCircle} topic-head d-flex justify-content-end`}
            >
              <span
                className={`d-inline-block align-top me-2 placeholder`}
              ></span>
            </div>

            <div className={Styles.topicBottom}>
              <div className={Styles.topicBotto}>
                <span className="w-50 p-2  placeholder "></span>
              </div>
              <div className={Styles.topicCounting}>
                <span className="w-25 p-3 mt-2  placeholder "></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row gy-3">
            <div className="col-md-6">
              <div
                className={` ${Styles.cardHiegh} ${Styles.topicBox} aria-hidden="true"`}
              >
                <div
                  className={`  ${Styles.topicCircle} topic-head d-flex justify-content-end`}
                >
                  <span
                    className={`d-inline-block align-top me-2 placeholder`}
                  ></span>
                </div>

                <div className={Styles.topicBottom}>
                  <div className={Styles.topicBotto}>
                    <span className="w-50 p-2  placeholder "></span>
                  </div>
                  <div className={Styles.topicCounting}>
                    <span className="w-25 p-3 mt-2  placeholder "></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className={` ${Styles.cardHiegh} ${Styles.topicBox} aria-hidden="true"`}
              >
                <div
                  className={`  ${Styles.topicCircle} topic-head d-flex justify-content-end`}
                >
                  <span
                    className={`d-inline-block align-top me-2 placeholder`}
                  ></span>
                </div>

                <div className={Styles.topicBottom}>
                  <div className={Styles.topicBotto}>
                    <span className="w-50 p-2  placeholder "></span>
                  </div>
                  <div className={Styles.topicCounting}>
                    <span className="w-25 p-3 mt-2  placeholder "></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className={` ${Styles.cardHiegh} ${Styles.topicBox} aria-hidden="true"`}
              >
                <div
                  className={`  ${Styles.topicCircle} topic-head d-flex justify-content-end`}
                >
                  <span
                    className={`d-inline-block align-top me-2 placeholder`}
                  ></span>
                </div>
                <div className={Styles.topicBottom}>
                  <div className={Styles.topicBotto}>
                    <span className="w-50 p-2  placeholder "></span>
                  </div>
                  <div className={Styles.topicCounting}>
                    <span className="w-25 p-3 mt-2  placeholder "></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className={` ${Styles.cardHiegh} ${Styles.topicBox} aria-hidden="true"`}
              >
                <div
                  className={`  ${Styles.topicCircle} topic-head d-flex justify-content-end`}
                >
                  <span
                    className={`d-inline-block align-top me-2 placeholder`}
                  ></span>
                </div>

                <div className={Styles.topicBottom}>
                  <div className={Styles.topicBotto}>
                    <span className="w-50 p-2  placeholder "></span>
                  </div>
                  <div className={Styles.topicCounting}>
                    <span className="w-25 p-3 mt-2  placeholder "></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default TrendingTopicsPlaceholder;
