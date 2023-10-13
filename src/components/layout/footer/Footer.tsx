import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../footer/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faLinkedin,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { CONSTANTS } from "constants/Constants";
import { images } from "utils/exportImagesUtils/images";

const Footer = () => {
  const [activeLink, setActiveLink] = useState<string>("/");
  const location = useLocation();

  // set active link based on location
  const handleLinkClick = (link: string): void => {
    setActiveLink(link);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const socialMediaIcons = [
    { icon: faLinkedin, url: CONSTANTS.Linked_IN_URL },
    { icon: faYoutube, url: CONSTANTS.YOUTUBE_URL },
    { icon: faSquareInstagram, url: CONSTANTS.INSTAGRAM_URL },
  ];

  return (
    <>
      <footer className={`bd-footer mt-p-5 mb-0`}>
        <div className="container ">
          <div className={`row border-top ${styles.footerTBPadding}`}>
            <div className="col-lg-6 mb-3">
              <div className="d-inline-flex mb-2 link-dark text-decoration-none">
                <a className="d-inline-flex   link-dark text-decoration-none">
                  <img
                    src={images.rgtlogo}
                    alt="rgtlogo"
                    className={`d-inline-block align-top me-2 ${styles.logoHeightWidth}`}
                  />
                </a>
              </div>

              <p data-testid="paragraphData" className={styles.paragraphData}>
                Ratna Global Tech is an IT services firm that manages this
                website to curate a list of upcoming conferences
              </p>
              <div>
                <Link
                  to={CONSTANTS.RGT_WEBSITE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-outline-primary ${styles.outlineBtn}`}
                >
                  {" "}
                  Website
                  <span className={styles.iconStyle}>
                    <img src={images.navigateDarkIcon} />
                  </span>
                </Link>
                <span className={styles.iconsPosition}>
                  {socialMediaIcons.map((data, index) => (
                    <Link
                      key={index}
                      to={data.url}
                      target="_blank"
                      className={styles.channelLink}
                    >
                      <FontAwesomeIcon
                        className={`${index === 0 ? styles.iconPadding : ""} ${
                          styles.fa
                        }`}
                        icon={data.icon}
                      />
                    </Link>
                  ))}
                </span>
              </div>
            </div>
            <div className="col-6  pt-4">
              <h5 className={styles.footerHeader}>Company</h5>
              <ul className={`list-unstyled pt-2 ${styles.listPadding}`}>
                {CONSTANTS?.LINKS_DATA?.map((data, index) => (
                  <li key={index}>
                    <Link
                      className={`${
                        activeLink === data.link ? styles.activeLink : ""
                      } ${styles.linkStyles}`}
                      to={data.link}
                      onClick={() => handleLinkClick(data.link)}
                      data-testid="home"
                    >
                      {data.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`row border-top ${styles.footerTBPadding}`}>
            <div className="col-md-12 text-md-center">
              <p className="text-muted mb-0">{CONSTANTS.COPY_RIGHTS}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
