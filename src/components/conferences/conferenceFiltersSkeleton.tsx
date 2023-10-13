import styles from "./conferences.module.css";

const ConferenceFiltersSkeleton = () => (
  <div className={` ${styles.filtersAccordion} placeholder`}>
    {/* Date Filter */}
    <div>
      <h2 id="headingOne">
        <span
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
          className="placeholder"
        ></span>
      </h2>
    </div>
    {/* Location Filter */}
    <div>
      <h2 id="headingOne">
        <span
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
          className="placeholder"
        ></span>
      </h2>
    </div>
    {/* Entry Fee Filter */}
    <div>
      <h2 id="headingOne">
        <span
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
          className="placeholder"
        ></span>
      </h2>
    </div>
  </div>
);

export default ConferenceFiltersSkeleton;
