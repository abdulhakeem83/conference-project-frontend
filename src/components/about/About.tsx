import { images } from "utils/exportImagesUtils/images";
import Aboutus from "./About.module.css";

const About = () => (
  <>
    <div className={` ${Aboutus.about} pb-5 wrapper`}>
      <div
        className={`container inner-head-page mt-5 ${Aboutus.innerHeadpage}`}
      >
        <div className={`row d-flex justify-content-center`}>
          <div
            className={`col-lg-8 col-md-12 col-sm-12 col-xs-12 text-center my-5`}
          >
            <h1>Explore a world of networking and innovation </h1>
            <p className={`px-lg-5 pt-3`}>
              Our platform is dedicated to providing a comprehensive listing of
              conferences from various industries and fields.
            </p>
            <div className={`gap-2 d-flex justify-content-center  pt-2`}>
              <a href="/conferences">Explore our conference listing </a>
              <span>
                <img src={images.rightArrow} />
              </span>
            </div>
          </div>
        </div>
        <div className={`row pt-5`}>
          <div className={`col-md-12`}>
            <img
              src={images.conferences}
              className={`img-fluid float-end`}
              alt="image"
            />
          </div>
        </div>
      </div>
      <div className={`container  ${Aboutus.cardsCol} my-5`}>
        <div className={`row text-center gy-5  py-5`}>
          <div className={`col-md-4`}>
            <img
              src={images.globesvg}
              alt=""
              className={`d-inline-block align-top me-2`}
            />
            <h2 className={`mt-5`}>Extensive Network</h2>
            <p className={`mt-3`}>
              Our platform connects you with a vast network of conference
              organizers and attendees from all around the world
            </p>
          </div>
          <div className={`col-md-4`}>
            <img
              src={images.globesvg}
              alt=""
              className={`d-inline-block align-top me-2`}
            />
            <h2 className="mt-5">Verified Listings</h2>
            <p className="mt-3">
              Our platform connects you with a vast network of conference
              organizers and attendees from all around the world
            </p>
          </div>
          <div className={`col-md-4`}>
            <img
              src={images.globesvg}
              alt=""
              className={`d-inline-block align-top me-2`}
            />
            <h2 className={`mt-5`}>Community-driven</h2>
            <p className={`mt-3`}>
              Our platform connects you with a vast network of conference
              organizers and attendees from all around the world
            </p>
          </div>
        </div>
      </div>
      <div className={`bg-color mt-5`}>
        <div className={`container ${Aboutus.secMission} section-tb-p`}>
          <div className={`row`}>
            <div className={`col-md-6`}>
              <h2>Mission</h2>
            </div>
            <div className={`col-md-6`}>
              <div className="">
                <p>
                  Whether you are a professional, researcher, or simply someone
                  passionate about a particular field, our website is designed
                  to connect you with conferences across various industries and
                  domains.
                </p>
              </div>
              <div className={` ${Aboutus.missionItems} mt-5`}>
                <ul>
                  <li>
                    <img
                      src={images.globesvg}
                      alt=""
                      className={`d-inline-block align-top me-2`}
                    />
                    <span>Lorem ipsum dolor sit.</span>
                  </li>
                  <li>
                    <img
                      src={images.globesvg}
                      alt=""
                      className={`d-inline-block align-top me-2`}
                    />
                    <span>Lorem ipsum dolor sit.</span>
                  </li>
                  <li>
                    <img
                      src={images.globesvg}
                      alt=""
                      className={`d-inline-block align-top me-2`}
                    />
                    <span>Lorem ipsum dolor sit.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default About;
