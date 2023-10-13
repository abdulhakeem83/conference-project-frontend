import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../header/Header.module.css";
import { useLocation } from "react-router-dom";
import { CONSTANTS } from "constants/Constants";
import { images } from "utils/exportImagesUtils/images";

const Header = () => {
  const [activeLink, setActiveLink] = useState<string>("/");
  const location = useLocation();

  // useEffect to get current path
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // set active link based on location
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <>
      <nav
        data-testid="navbar"
        className="navbar navbar-expand-lg navbar-light fixed-top bg-light"
      >
        <div className="container">
          <Link
            data-testid="homeLink"
            className="navbar-brand"
            to={"/"}
            onClick={() => handleLinkClick("/")}
          >
            <img
              src={images.rgtlogo}
              alt="rgtlogo"
              className={`d-inline-block align-top me-2 ${styles.logoHeightWidth}`}
            />
            <span className={styles.title} data-testid="headerTitle">
              {" "}
              Ratna Global Technologies{" "}
            </span>
          </Link>
          <button
            className={`navbar-toggler ${styles.toogleButton}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              {CONSTANTS?.LINKS_DATA?.map((data, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    className={`${
                      index === CONSTANTS?.LINKS_DATA?.length - 1
                        ? "me-0 pe-0"
                        : ""
                    } ${activeLink === data.link ? styles.activeLink : ""} ${
                      styles.focusLinks
                    }`}
                    to={data.link}
                    onClick={() => handleLinkClick(data.link)}
                    data-testid={data.name.toLowerCase()}
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
