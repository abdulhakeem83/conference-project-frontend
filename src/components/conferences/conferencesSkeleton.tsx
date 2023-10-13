import ConferenceFiltersSkeleton from "./conferenceFiltersSkeleton";
import styles from "./conferences.module.css";

const ConferencesSkeleton = () => (
  <>
    <div className={styles.conferenceScreen}>
      {/* Search Section */}
      <div className={`container-fluid p-lg-4 p-3 ${styles.searchSection}`}>
        {/* Search Form */}
        <div className="container mt-5 pt-lg-4 pt-0 d-flex flex-row">
          <div className={`${styles.searchSide} placeholder-glow`}>
            {/* Search Input */}
            <div className={`placeholder p-0 ${styles.searchbar}`}></div>
            {/* Topic Filter */}
            <span
              className={`mt-4 mt-lg-0 d-lg-block d-none placeholder rounded-0 ${styles.selectTopic}`}
            ></span>
          </div>
          {/* Search Button */}
          <div
            className={`${styles.buttonSide} d-lg-block d-none placeholder-glow`}
          >
            <span className={`placeholder h-100 ${styles.searchBtn}`}></span>
          </div>
        </div>
      </div>

      {/* Conference List */}
      <div className="container mt-4">
        <div className={`${styles.conferenceSections}`}>
          <div className={`${styles.conferenceSide}`}>
            <div className="row">
              <div>
                <div className={`d-block d-lg-none ${styles.displayFilters}`}>
                  <div className="row ">
                    <div
                      className={`col-sm-10 col-8 d-flex align-items-center flex-nowrap  gap-3 ${styles.scrollBarX}`}
                    >
                      <div className={`gap-2 ${styles.filters}`}></div>
                    </div>
                    {/*Filter button*/}
                    <div className="col-sm-2 col-4  ">
                      <span
                        className="placeholder h-100 d-flex align-items-center justify-content-center bg-white w-100 text-danger text-center"
                        style={{ cursor: "default" }}
                      ></span>
                    </div>
                  </div>
                </div>
                <div
                  className={`row ${styles.displayFilters} placeholder-glow`}
                >
                  {/* Filters */}
                  <div
                    className={`col-sm-10 12 col-12 d-flex align-items-center flex-nowrap placeholder gap-3 ${styles.scrollBarX}`}
                  ></div>
                  {/* Clear Filters Button */}
                  <div className="col-sm-2 col-5 d-none d-lg-block placeholder-glow">
                    <span className="d-flex align-items-center h-100 placeholder"></span>
                  </div>
                </div>
                {/* Conference List Items */}
                <div
                  className={`container px-sm-3 mt-3 ${styles.cardMain} placeholder-glow`}
                >
                  <div
                    className={`row p-lg-0 d-flex align-items-center placeholder ${styles.listItem}`}
                  >
                    <div className="col-lg-4 12 p-0 px-lg-1 pl-lg-0 ">
                      <span
                        className={`d-lg-block d-none ${styles.listImageLg}`}
                      ></span>
                      <span
                        className={`d-lg-none w-100 d-block ${styles.listImageSm}`}
                      ></span>
                    </div>
                    <div className="col-lg-8 12 px-1 pl-lg-4 pr-lg-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.filterSide} placeholder-glow`}>
            {/* Filters Section */}
            <div className={`d-none d-lg-block`}>
              <div className={`d-flex  justify-content-center`}>
                <ConferenceFiltersSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ConferencesSkeleton;
