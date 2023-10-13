import Slider from "react-slick";
import { Link, useLocation, useParams } from "react-router-dom";
import Styles from "../conferenceDetails/ConferenceDetails.module.css";
import { images } from "utils/exportImagesUtils/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  getSimilarConferences,
  getConferenceDetails,
} from "../../service/conferenceDetails/conferenceDeatilsServices";
import { useEffect, useRef, useState } from "react";
import { conferenceTypes } from "types/conferenceDetails";
import Spinner from "genericComponents/spinner/Spinner";
import ReUsableCards from "genericComponents/reusableCards/ReUsableCards";
import { decryptData } from "utils/crypto/Crypo";
import CardPlaceHolders from "genericComponents/cardPlaceholders/CardPlaceHolders";
import { CONSTANTS } from "constants/Constants";
import { conferenceDataTypes, filterTypes } from "types";
import { shortDateFormat, filterMonthByDate } from "utils/dates/Dates";

const ConferenceDetails = () => {
  const cardSlider = useRef<Slider | null>(null);
  const [similarConference, setSimilarConference] =
    useState<[conferenceDataTypes]>();
  const [conferenceData, setConferenceData] = useState<conferenceTypes>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingCard, setIsLoadingCard] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [deatilCount, setDetailCount] = useState<number>();
  const [lazyLoading, setLazyLoading] = useState<boolean>(false);
  const limitSimilar: number = 12;
  const location = useLocation();
  const previousLocation: string = location?.state?.from;
  const { id } = useParams();
  const [filters, setFilters] = useState<filterTypes>({
    conferenceType: [],
    conferenceSearchParam: "",
    conferenceDate: [],
    conferenceEntryFee: [],
    conferenceCities: [],
    conferenceRandomDate: "",
  });

  const getSimilarConferenceLists = async () => {
    setLazyLoading(true);
    if (filters?.conferenceType && filters?.conferenceType?.length > 0) {
      await getSimilarConferences(pageNumber, limitSimilar, filters).then(
        (res) => {
          const conferenceListLength = similarConference
            ? [...similarConference]
            : [];
          {
            conferenceListLength.length === 0
              ? setSimilarConference(res?.data?.list)
              : setSimilarConference((prevNearByConferences) => {
                  const newData = res?.data?.list || [];
                  return prevNearByConferences
                    ? [...prevNearByConferences, ...newData]
                    : newData;
                });
          }
          setDetailCount(res?.data?.totalCount);
          setLazyLoading(false);
          setIsLoadingCard(false);
        },
      );
    }
  };
  const getConferenceDetailsLists = async () => {
    id &&
      (await getConferenceDetails(decryptData(id)).then(
        async (res: { data: conferenceTypes }) => {
          if (res?.data) {
            setIsLoading(false);
            setConferenceData(res?.data);
            setFilters((pre) => ({
              ...pre,
              conferenceType: res?.data?.type,
            }));
          }
        },
      ));
  };
  useEffect(() => {
    getSimilarConferenceLists();
  }, [filters, pageNumber]);
  useEffect(() => {
    getConferenceDetailsLists();
  }, [id]);

  const cardImages = [
    { img: images.Rectangle21 },
    { img: images.Rectangle22 },
    { img: images.Rectangle23 },
    { img: images.Rectangle21 },
  ];
  // Slidebar btns
  const totalImagesPerSlide = 3;
  const totalPages = Math.ceil(cardImages.length / totalImagesPerSlide);

  const previosBtn = () => {
    cardSlider.current && cardSlider.current.slickPrev();
    currentPage > 1 && setCurrentPage(currentPage - 1);
  };

  const nextButton = () => {
    cardSlider.current && cardSlider.current.slickNext();
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  };

  // ReUsableCards btns
  const handleNextPage = () => {
    deatilCount &&
      pageNumber < Math.ceil(deatilCount / 3) - 1 &&
      setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    pageNumber > 0 && setPageNumber(pageNumber - 1);
  };

  // Slidebar Responsive Pagination Section

  return (
    <>
      <div className="wrapper conf-details">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className={`container  wrapper ${Styles.topspace}`}>
              <div className="row">
                <div className="col-sm-12">
                  <nav className={Styles.breadStyle} aria-label="breadcrumb">
                    <ol className={`breadcrumb ${Styles.breadcrumbresponsive}`}>
                      <li className="breadcrumb-item">
                        <Link className={Styles.breadcrumb} to="/">
                          Home
                        </Link>
                      </li>
                      {previousLocation === "Conferences" && (
                        <li className="breadcrumb-item">
                          <Link className={Styles.breadcrumb} to="/conferences">
                            Conferences
                          </Link>
                        </li>
                      )}
                      <li className="breadcrumb-item">
                        <Link
                          className={`${Styles.breadcrumbActive} ${Styles.webclampline1}`}
                          to="/conferenceDetails"
                        >
                          {conferenceData?.name}
                        </Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="container mb-5">
              <div className="row">
                <div className="col-lg-8 12">
                  <img
                    src={images.Rectangle}
                    alt="no img"
                    className={Styles.reactangleimg}
                  />
                  <div className={`mt-3 ${Styles.IConferenceStyles}`}>
                    <h3>{conferenceData?.name}</h3>
                    <p>{conferenceData?.description}</p>
                  </div>
                  <div className="mt-1">
                    {conferenceData?.type?.map((type, index) => (
                      <Link
                        key={index}
                        to={""}
                        className={Styles.nasscomtechbtn}
                      >
                        {type}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Attending information Section */}
                <div className="col-lg-4  d-flex  ">
                  <div className={Styles.attendingborder}>
                    <div className="mt-1 mb-3">
                      <h4 className={`${Styles.attendingheading}`}>
                        Attending information
                      </h4>
                      {/* Fetching Data from ConferenceDetailsApi */}
                      <ul
                        className={`nav flex-column mt-3 ${Styles.ulbardeatils}`}
                      >
                        <li>
                          <span className="d-flex">
                            <img src={images.locationIcon} />
                            <div className={Styles.cardTextCity}>
                              {conferenceData?.city?.map(
                                (elem: string, index: number) => (
                                  <h6 key={index}>{elem}</h6>
                                ),
                              )}
                            </div>
                          </span>
                        </li>
                        <li>
                          <span className="d-flex">
                            <img src={images.calendarIcon} />
                            &nbsp;&nbsp;
                            <h4 className={Styles.attendingfont}>
                              {" "}
                              {conferenceData?.startDate &&
                                shortDateFormat(conferenceData?.startDate)}
                              -{" "}
                              {conferenceData?.endDate &&
                                shortDateFormat(conferenceData?.endDate)}
                              &nbsp;
                              <span>
                                {conferenceData?.endDate &&
                                  conferenceData?.startDate &&
                                  (filterMonthByDate(
                                    conferenceData?.startDate,
                                  ) !==
                                  filterMonthByDate(conferenceData?.endDate)
                                    ? `${filterMonthByDate(
                                        conferenceData?.startDate,
                                      )} - ${filterMonthByDate(
                                        conferenceData?.endDate,
                                      )}`
                                    : filterMonthByDate(
                                        conferenceData?.startDate,
                                      ))}
                                &nbsp;
                                <span className={Styles.dividersize}></span>
                                &nbsp;&nbsp;{conferenceData?.fromTime} -{" "}
                                {conferenceData?.toTime}
                              </span>
                            </h4>
                          </span>
                        </li>
                        <li>
                          <span className="d-flex">
                            <img src={images.rupeeIcon} />
                            &nbsp;&nbsp;
                            <h4 className={Styles.attendingfont}>
                              {conferenceData?.ticketPrice}
                            </h4>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="mt-3 mb-3">
                      <h4 className={Styles.attendingheading}>Organizers</h4>
                      {conferenceData?.organizedBy.map((name, index) => (
                        <span key={index} className="d-flex mt-3">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                            className="rounded-circle mb-1 w-10"
                            width="10%"
                            alt="Avatar"
                          />
                          &nbsp;
                          <h6 className={`d-flex ${Styles.organizationfont}`}>
                            {name}
                          </h6>
                        </span>
                      ))}
                    </div>
                    <div className="dropdown-divider mt-1"></div>
                    <div className="mt-3 mb-3">
                      <h4 className={Styles.attendingheading}>Speakers</h4>
                      {conferenceData?.speakers.map((name, index) => (
                        <span key={index} className="d-flex mt-3">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                            className="rounded-circle mb-1 w-10"
                            width="10%"
                            alt="Avatar"
                          />
                          &nbsp;
                          <h6 className={`d-flex ${Styles.organizationfont}`}>
                            {name}
                          </h6>
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 mb-2">
                      <Link to={"/contact"}>
                        <button type="button" className={Styles.resigsterbtn}>
                          <span>
                            Resgister &nbsp;&nbsp;
                            <img src={images.registerIcon} />
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" row p-0 mt-3">
                <div className="col-lg-8 col-md-12">
                  <div
                    className={`row gx-2  d-flex  ${Styles.scrollBar} flex-nowrap`}
                  >
                    <Slider {...CONSTANTS.settings} ref={cardSlider}>
                      {cardImages.map((cardImage, index) => (
                        <div key={index} className="col-lg-4 col-md-5  ">
                          <img
                            src={cardImage.img}
                            alt="no img"
                            className={`${Styles.reactangleimg1} me-2`}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>

                {cardImages.length > 3 && (
                  <div className="row pt-4 ">
                    <div className="col-md-8">
                      <nav
                        aria-label="Page navigation example"
                        className=" mt-3 d-flex justify-content-end align-items-center"
                      >
                        <ul
                          className={`pagination gap-2 ${Styles.dispalyPagination}`}
                        >
                          <li className="page-item">
                            <button
                              disabled={currentPage <= 1}
                              onClick={() => previosBtn()}
                              className="page-link rounded-circle"
                            >
                              <FontAwesomeIcon
                                className={`${Styles.faChevron}`}
                                icon={faChevronLeft}
                              />
                            </button>
                          </li>
                          <li className="page-item">
                            <button
                              disabled={currentPage >= totalPages}
                              className="page-link rounded-circle"
                              onClick={() => nextButton()}
                            >
                              <FontAwesomeIcon
                                className={`${Styles.faChevron}`}
                                icon={faChevronRight}
                              />
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Conference Section */}
            <div className={`  ${Styles.sectionTbp} `}>
              <div className={"container  section-margin-tb"}>
                <div className="row gy-2">
                  <div className={`col-md-12 ${Styles.trendTopic}`}>
                    <h1 className="">Similar Conference</h1>
                  </div>
                </div>

                {/* similarConference data passing to ReUsableCards */}
                {isLoadingCard ? (
                  <CardPlaceHolders />
                ) : (
                  <div
                    className={`container section-padding-tb pt-0 ${Styles.sectionTbP}`}
                  >
                    {similarConference && (
                      <ReUsableCards
                        data={similarConference || []}
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                        pageNumber={pageNumber}
                        totalRecords={deatilCount}
                        from={previousLocation}
                        currentLocation={"conferenceDetails"}
                        lazyLoading={lazyLoading}
                        setLazyLoading={setLazyLoading}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ConferenceDetails;
