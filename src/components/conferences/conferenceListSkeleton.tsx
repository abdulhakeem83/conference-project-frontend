import styles from "./conferences.module.css";

const ConferenceListSkeleton = () => (
  <div className={`container px-sm-3 mt-3 ${styles.cardMain} placeholder-glow`}>
    <div
      className={`row p-lg-0 d-flex align-items-center placeholder ${styles.listItem}`}
    >
      <div className="col-lg-4 12 p-0 px-lg-1 pl-lg-0 ">
        <span className={`d-lg-block d-none ${styles.listImageLg}`}></span>
        <span
          className={`d-lg-none w-100 d-block ${styles.listImageSm}`}
        ></span>
      </div>
      <div className="col-lg-8 12 px-1 pl-lg-4 pr-lg-4"></div>
    </div>
  </div>
);

export default ConferenceListSkeleton;
