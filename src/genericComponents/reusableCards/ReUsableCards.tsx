import Styles from "./ReUsableCard.module.css";
import Slider, { LazyLoadTypes, SwipeDirection } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cardImg from "../../assets/images/card-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CardPropType } from "types/index";
import { memo, useRef, useState } from "react";
import CardPlaceHolders from "../cardPlaceholders/CardPlaceHolders";
import { shortDateFormat, filterMonthByDate } from "utils/dates/Dates";
import { encryptData } from "utils/crypto/Crypo";

const ReUsableCards = (props: CardPropType) => {
  const customeSlider = useRef<Slider | null>(null);
  const {
    data,
    handleNextPage,
    pageNumber = 0,
    totalRecords = 3,
    from = "Home",
    lazyLoading = true,
    setLazyLoading,
    currentLocation = "Home",
    limit = 3,
  } = props;
  const [buttonState, setButtonState] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [prevButtonClicked, setPrevButtonClicked] = useState<boolean>();
  let swiperDirection: string;
  let slidesToMove = 3;

  //  adjust slides the based on screen width to move accordingly
  if (window.innerWidth <= 480) {
    slidesToMove = 1;
  } else if (window.innerWidth <= 600) {
    slidesToMove = 2;
  } else if (window.innerWidth <= 768) {
    slidesToMove = 2;
  } else if (window.innerWidth <= 1024) {
    slidesToMove = 2;
  }

  const gotoNext = () => {
    if (customeSlider.current) {
      customeSlider.current.slickNext();
      setPrevButtonClicked(false);
    }
  };

  const gotoPrev = () => {
    if (customeSlider.current) {
      customeSlider.current.slickPrev();
      setPrevButtonClicked(true);
    }
  };

  const handleDragEnd = (currentIndex: number) => {
    setCurrentSlideIndex(currentIndex);
    if (!buttonState && swiperDirection !== "right") {
      const currentArrayCount = data && data.length - slidesToMove;
      if (
        !prevButtonClicked &&
        currentSlideIndex === currentArrayCount &&
        totalRecords &&
        pageNumber !== totalRecords / limit - 1
      ) {
        setButtonState(true);
        setLazyLoading && setLazyLoading(true);
        handleNextPage();
      }
    }
  };

  const handelSwipeDirection = (swipeDirection: SwipeDirection) => {
    swiperDirection = swipeDirection;
    swipeDirection === "right"
      ? setPrevButtonClicked(true)
      : setPrevButtonClicked(false);
  };

  const handleLazyLoad = () => {
    setButtonState(false);
    if (customeSlider.current && currentSlideIndex !== 0 && buttonState) {
      customeSlider.current.slickGoTo(currentSlideIndex + slidesToMove);
      setCurrentSlideIndex(currentSlideIndex + slidesToMove);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    lazyLoad: "ondemand" as LazyLoadTypes,
    rows: 1,
    onSwipe: handelSwipeDirection,
    afterChange: handleDragEnd,
    waitForAnimate: true,
    useTransform: false,
    touchMove: true,
    onLazyLoad: handleLazyLoad,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {lazyLoading && <CardPlaceHolders />}
      <div className={`row d-flex gy-3  ${Styles.scrollBar}  flex-nowrap`}>
        {!lazyLoading && (
          <Slider
            {...settings}
            ref={customeSlider}
            className={`col-lg-10 col-md-9 col-9  ${Styles.mobileCard}`}
          >
            {data &&
              data?.map((list, index) => (
                <div
                  className={`col-lg-3 col-md-9 col-9 ${Styles.sectionCards}`}
                  key={list._id}
                >
                  {/* {index+1} */}
                  <div
                    className={`${
                      currentLocation === "Home"
                        ? Styles.cardMain
                        : Styles.cardMainDetails
                    } `}
                  >
                    <div className={`${Styles.card} shadow  h-100 `}>
                      <img
                        src={cardImg}
                        className={` ${Styles.cardImgTop}`}
                        alt="banner"
                      />

                      <div className="card-body">
                        {list?._id && (
                          <Link
                            to={`/conferencedetails/${encryptData(list?._id)}`}
                            state={{ from: from }}
                            className={Styles.linkName}
                          >
                            <h5 className={` ${Styles.cardTitle} `}>
                              {" "}
                              {list?.name}
                            </h5>
                          </Link>
                        )}
                        <div className={`${Styles.cardText}  mt-3 `}>
                          {list?.type?.map((lists, ind) => (
                            <span key={ind}>{lists} </span>
                          ))}
                        </div>

                        <hr></hr>

                        <div className="dropdownDivider"></div>

                        <div className={`${Styles.cardTextCity}  mt-3 `}>
                          {list?.city?.map((lists, ind) => (
                            <span key={ind}>{lists} </span>
                          ))}
                        </div>

                        <div className={` ${Styles.cardTextDate} mt-3 d-flex`}>
                          <div
                            className={` d-flex align-items-center justify-content-center ${Styles.cardTextDate}`}
                          >
                            <h4
                              className={`${Styles.itemTimings} text-truncate`}
                              style={{ color: index === 0 ? "red" : "black" }}
                            >
                              {list?.startDate &&
                                shortDateFormat(list?.startDate)}{" "}
                            </h4>
                            <h5
                              style={{ color: index === 0 ? "red" : "black" }}
                            >
                              {list?.startDate &&
                                filterMonthByDate(list?.startDate)}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        )}
        {!lazyLoading && (
          <div className="col-lg-2  col-md-6 col-6 p-2">
            <Link to="/conferences" className={`${Styles.view}`}>
              <div className={`${Styles.viewAll}  shadow h-100`}>
                <h2>View all</h2>
              </div>
            </Link>
          </div>
        )}
      </div>
      <nav
        aria-label="Page navigation example"
        className="mt-5 d-flex justify-content-end align-items-center"
      >
        <ul className={`${Styles.paginationMobile} pagination gap-2`}>
          <li className="page-item">
            <button
              disabled={currentSlideIndex < 3}
              className="page-link rounded-circle border "
              onClick={() => gotoPrev()}
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
                currentSlideIndex >= totalRecords - 3 ? true : lazyLoading
              }
              className="page-link rounded-circle border "
              onClick={() => gotoNext()}
            >
              <FontAwesomeIcon
                className={`${Styles.faChevron}`}
                icon={faChevronRight}
              />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default memo(ReUsableCards);
