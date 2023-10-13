import { CONSTANTS } from "constants/Constants";
import { errorHandler } from "utils/toaster/toaster";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingTopics } from "service/homeServices/trendingTopicService";
import { conferenceTypes } from "types/homeConference";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "./Trending.module.css";
import TrendingTopicsPlaceholder from "./TrendingTopicsPlaceholder";
import { images } from "utils/exportImagesUtils/images";

const TrendingTopics = () => {
  const navigate = useNavigate();
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [trendingPageNumber, setTrendingPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trendingTopicCount, setTrendingTopicCount] = useState();
  const limit = 5;
  const paginationLimit =
    (trendingTopicCount && Math.ceil(trendingTopicCount / limit) - 1) || 0;

  // Pagination for Trending topics start
  const handleNextPages = () => {
    trendingPageNumber < paginationLimit &&
      setTrendingPageNumber(trendingPageNumber + 1);
  };
  const handlePreviousPages = () => {
    trendingPageNumber > 0 && setTrendingPageNumber(trendingPageNumber - 1);
  };
  // Pagination for Trending topics end

  // API Call for Trending Topics
  const getTrendingTopicsLists = async () => {
    setIsLoading(true);
    await getTrendingTopics(trendingPageNumber, limit)
      .then((res) => {
        setTrendingTopics(res?.data?.list);
        setTrendingTopicCount(res?.data?.totalCount);
        setIsLoading(false);
      })
      .catch((err) => errorHandler(err.response.data.message));
  };

  useEffect(() => {
    getTrendingTopicsLists();
  }, [trendingPageNumber]);

  return (
    <div
      className={`container section-padding-tb section-trending ${Styles.sectionTrending}`}
    >
      <div className="row gy-3 ">
        <div
          className={`col-md-12 mb-b-5 ${Styles.trendTopic} d-flex justify-content-between align-items-center`}
        >
          <h2>{CONSTANTS.HOME_TRENDING}</h2>
        </div>
      </div>
      {isLoading ? (
        <TrendingTopicsPlaceholder />
      ) : (
        <div className={`row ${Styles.cardHieght} `}>
          {trendingTopics?.length > 0 &&
            trendingTopics?.map(
              (topicItem: conferenceTypes, index) =>
                index === 0 && (
                  <div
                    key={index}
                    className="col-lg-4 col-md-12 d-flex align-items-stretch"
                    onClick={() =>
                      navigate("/conferences", {
                        state: { type: topicItem?.type },
                      })
                    }
                  >
                    <div className={`  ${Styles.topicBox}`}>
                      <div className=" topic-head d-flex justify-content-end">
                        <img
                          src={images.globesvg}
                          alt=""
                          className={`d-inline-block align-top me-2`}
                        />
                      </div>

                      <div className={Styles.topicBottom}>
                        <p>{topicItem?.type}</p>

                        <div
                          className={`${Styles.cardTextDate} ${Styles.colorRed} mt-3 d-flex`}
                        >
                          <span className={Styles.topicCount}>
                            {trendingTopicCount} New
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
            )}

          <div className="col-lg-8 col-md-12">
            <div className="row gy-3">
              {trendingTopics?.length > 0 &&
                trendingTopics?.map(
                  (topicItem: conferenceTypes, index) =>
                    index !== 0 && (
                      <div
                        key={index}
                        className="col-md-6"
                        onClick={() =>
                          navigate("/conferences", {
                            state: { type: topicItem?.type },
                          })
                        }
                      >
                        <div
                          className={` ${Styles.cardHiegh} ${Styles.topicBox}`}
                        >
                          <div className="topic-head d-flex justify-content-end">
                            <img
                              src={images.globesvg}
                              alt=""
                              className={`d-inline-block align-top me-2`}
                            />
                          </div>

                          <div className={Styles.topicBottom}>
                            <p>{topicItem?.type}</p>

                            <div
                              className={`${Styles.cardTextDate} ${Styles.colorRed} mt-3 d-flex`}
                            >
                              <span className={Styles.topicCount}>
                                {trendingTopicCount} New
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                )}
            </div>
          </div>
        </div>
      )}
      {trendingTopicCount && trendingTopicCount > 5 && (
        <nav
          aria-label="Page navigation example"
          className="mt-5 d-flex justify-content-end align-items-center"
        >
          <ul className={`${Styles.paginationMobile} pagination gap-2`}>
            <li className="page-item">
              <button
                disabled={trendingPageNumber < 1}
                className="page-link rounded-circle border"
                onClick={() => handlePreviousPages()}
              >
                <FontAwesomeIcon
                  className={`${Styles.faChevron}`}
                  icon={faChevronLeft}
                />
              </button>
            </li>
            <li className="page-item">
              <button
                disabled={
                  trendingPageNumber >= Math.ceil(trendingTopicCount / 5) - 1
                }
                className="page-link rounded-circle border"
                onClick={() => handleNextPages()}
              >
                <FontAwesomeIcon
                  className={`${Styles.faChevron}`}
                  icon={faChevronRight}
                />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default memo(TrendingTopics);
