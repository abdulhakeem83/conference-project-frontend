import { useEffect, useState } from "react";
import {
  getConferenceList,
  getConferenceLocations,
  getConferencePrices,
  getConferenceTopics,
  getconferenceDates,
} from "../../service/conferenceLists/conferenceListsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFilter,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./conferences.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  conferenceListResponseType,
  conferenceLists,
  conferenceLoaders,
  conferenceTypes,
  listFiltersTypes,
  modalFilterTypes,
} from "../../types/conferenceListsTypes";
import ConferencesSkeleton from "./conferencesSkeleton";
import ConferenceListSkeleton from "./conferenceListSkeleton";
import { encryptData } from "utils/crypto/Crypo";
import { images } from "utils/exportImagesUtils/images";

const ConferenceLists = () => {
  const location = useLocation();
  // State variables
  const [conferenceTopics, setConferenceTopics] = useState<conferenceTypes[]>();
  const [conferenceList, setConferenceList] = useState<conferenceLists>();
  const [topicFilter, setTopicFilter] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [listResponseLimit] = useState<number>(5);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [conferenceLocations, setConferenceLocations] =
    useState<{ name: string }[]>();
  const [conferenceDates, setConferenceDates] =
    useState<{ name: string; value: string }[]>();
  const [conferenceEntryFee, setConferenceEntryFee] =
    useState<
      { displayName: string; minimumPrice: number; maximumPrice: number }[]
    >();
  const [isLoading, setIsLoading] = useState<conferenceLoaders>({
    conferenceLists: true,
    conferenceDates: true,
    conferencePrices: true,
    conferenceTopics: true,
    conferenceLocations: true,
  });
  const [listFilters, setListFilters] = useState<listFiltersTypes>({
    conferenceType: location?.state?.type ? [location?.state?.type] : [],
    conferenceSearchParam: "",
    conferenceDate: [],
    conferenceEntryFee: [],
    conferenceCities: [],
    conferenceRandomDate: "",
  });
  const [modalFilters, setModalFilters] = useState<modalFilterTypes>({
    conferenceDate: [],
    conferenceCities: [],
    conferenceRandomDate: "",
    conferenceEntryFee: [],
  });
  const [paginationStates, setPaginationStates] = useState<{
    firstPage: { display: string; value: number };
    secondPage: { display: string; value: number };
    thirdPage: { display: string; value: number };
  }>({
    firstPage: { display: "1", value: 1 },
    secondPage: { display: "2", value: 2 },
    thirdPage: { display: "3", value: 3 },
  });
  //extracting short name of month from date
  const shortMonthFormat = (date: string) =>
    new Date(date).toLocaleString("default", { month: "short" });
  //converting yyyy-mm-dd to dd
  const shortDateFormat = (startDate: string, endDate: string) =>
    `${new Date(startDate).getDate().toFixed(0)}${" "}-${" "}${new Date(
      endDate,
    ).getDate()}`;
  // Function to handle conference search and filter update
  const handleConferenceSearch = (): void => {
    if (
      !listFilters?.conferenceSearchParam?.includes(searchFilter) &&
      searchFilter !== ""
    ) {
      setListFilters((pre) => ({
        ...pre,
        conferenceSearchParam: searchFilter,
      }));
    }
  };

  //Function to fetch conference locations from API
  const getLocations = async (): Promise<void> => {
    setIsLoading((pre) => ({
      ...pre,
      conferenceLocations: true,
    }));
    const response = await getConferenceLocations();
    if (response) {
      setConferenceLocations(response);
      setIsLoading((pre) => ({
        ...pre,
        conferenceLocations: false,
      }));
    }
  };

  // Function to fetch conference topics from the API
  const getTopics = async (): Promise<void> => {
    setIsLoading((pre) => ({
      ...pre,
      conferenceTopics: true,
    }));
    const response = await getConferenceTopics();
    if (response) {
      setConferenceTopics(response?.list);
      setIsLoading((pre) => ({
        ...pre,
        conferenceTopics: false,
      }));
    }
  };

  // Function to fetch conference list based on the page number
  const getConferenceLists = async (): Promise<void> => {
    setIsLoading((pre) => ({
      ...pre,
      conferenceLists: true,
    }));
    const response: conferenceListResponseType = await getConferenceList(
      pageNumber,
      listFilters,
      listResponseLimit,
    );
    if (response) {
      setIsLoading((pre) => ({
        ...pre,
        conferenceLists: false,
      }));
      setConferenceList((pre) => ({
        ...pre,
        list: [...(pre?.list ?? []), ...response.list],
        count: response?.totalCount,
      }));
    }
  };

  //Function to fetch conference dates
  const getDates = async (): Promise<void> => {
    setIsLoading((pre) => ({
      ...pre,
      conferenceDates: true,
    }));
    const response = await getconferenceDates();
    if (response) {
      setConferenceDates(response);
      setIsLoading((pre) => ({
        ...pre,
        conferenceDates: false,
      }));
    }
  };

  // Function to fetch conference entry fee
  const getConferenceFee = async (): Promise<void> => {
    setIsLoading((pre) => ({
      ...pre,
      conferencePrices: true,
    }));
    const response = await getConferencePrices();
    if (response) {
      setConferenceEntryFee(response);
      setIsLoading((pre) => ({
        ...pre,
        conferencePrices: false,
      }));
    }
  };

  // Function to handle filter changes based on the filter name
  const modalFilterChange = (
    filter:
      | string
      | { name: string }
      | { name: string; value: string }
      | { name: string; value: number }
      | { displayName: string; minimumPrice: number; maximumPrice: number },
    name: string,
  ): void => {
    if (name === "conferenceDate") {
      // Handling conference date filter
      if (!modalFilters?.conferenceDate.some((date) => date === filter)) {
        setModalFilters((pre) => ({
          ...pre,
          conferenceDate: [
            ...pre.conferenceDate,
            filter as { name: string; value: string },
          ],
        }));
      } else {
        setModalFilters((pre) => ({
          ...pre,
          conferenceDate: pre.conferenceDate.filter((date) => date !== filter),
        }));
      }
    } else if (name === "conferenceLocation") {
      // Handling conference location filter
      if (!modalFilters?.conferenceCities.some((city) => city === filter)) {
        setModalFilters((pre) => ({
          ...pre,
          conferenceCities: [
            ...pre.conferenceCities,
            filter as { name: string },
          ],
        }));
      } else {
        setModalFilters((pre) => ({
          ...pre,
          conferenceCities: pre.conferenceCities.filter(
            (city) => city !== filter,
          ),
        }));
      }
    } else if (name === "conferenceRandomDate") {
      // Handling conference location filter
      if (typeof filter === "string") {
        if (!modalFilters.conferenceRandomDate.includes(filter)) {
          setModalFilters((pre) => ({
            ...pre,
            conferenceRandomDate: filter,
          }));
        } else {
          setModalFilters((pre) => ({
            ...pre,
            conferenceRandomDate: "",
          }));
        }
      }
    } else if (name === "conferenceEntryFee") {
      // Handling conference location filter
      if (!modalFilters?.conferenceEntryFee.some((fee) => fee === filter)) {
        setModalFilters((pre) => ({
          ...pre,
          conferenceEntryFee: [
            ...pre.conferenceEntryFee,
            filter as {
              displayName: string;
              minimumPrice: number;
              maximumPrice: number;
            },
          ],
        }));
      } else {
        setModalFilters((pre) => ({
          ...pre,
          conferenceEntryFee: pre.conferenceEntryFee.filter(
            (fee) => fee !== filter,
          ),
        }));
      }
    }
  };

  // Function to handle filter changes based on the filter name
  const handleFilterChange = (
    filter:
      | string
      | { name: string }
      | { name: string; value: string }
      | { name: string; value: number }
      | { displayName: string; minimumPrice: number; maximumPrice: number },
    name: string,
  ): void => {
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
    if (name === "ticket") {
      // Handling ticket filter
      if (!listFilters?.conferenceEntryFee?.some((fee) => fee === filter)) {
        setListFilters((pre) => ({
          ...pre,
          conferenceEntryFee: [
            ...pre.conferenceEntryFee,
            filter as {
              displayName: string;
              minimumPrice: number;
              maximumPrice: number;
            },
          ],
        }));
      } else {
        setListFilters((pre) => ({
          ...pre,
          conferenceEntryFee: pre.conferenceEntryFee.filter(
            (fee) => fee !== filter,
          ),
        }));
        setModalFilters((pre) => ({
          ...pre,
          conferenceEntryFee: pre.conferenceEntryFee.filter(
            (fee) => fee !== filter,
          ),
        }));
      }
    } else if (name === "conferenceDate") {
      // Handling conference date filter
      if (!listFilters?.conferenceDate.some((date) => date === filter)) {
        setListFilters((pre) => ({
          ...pre,
          conferenceDate: [
            ...pre.conferenceDate,
            filter as { name: string; value: string },
          ],
        }));
      } else {
        setListFilters((pre) => ({
          ...pre,
          conferenceDate: pre.conferenceDate.filter((date) => date !== filter),
        }));
        setModalFilters((pre) => ({
          ...pre,
          conferenceDate: pre.conferenceDate.filter((fee) => fee !== filter),
        }));
      }
    } else if (name === "conferenceLocation") {
      // Handling conference location filter
      if (!listFilters?.conferenceCities.some((city) => city === filter)) {
        setListFilters((pre) => ({
          ...pre,
          conferenceCities: [
            ...pre.conferenceCities,
            filter as { name: string },
          ],
        }));
      } else {
        setListFilters((pre) => ({
          ...pre,
          conferenceCities: pre.conferenceCities.filter(
            (city) => city !== filter,
          ),
        }));
        setModalFilters((pre) => ({
          ...pre,
          conferenceCities: pre.conferenceCities.filter(
            (fee) => fee !== filter,
          ),
        }));
      }
    } else if (name === "conferenceTopic") {
      // Handling conference location filter
      if (!listFilters?.conferenceType.some((city) => city === filter)) {
        setListFilters((pre) => ({
          ...pre,
          conferenceType: [...pre.conferenceType, filter as string],
        }));
      } else {
        setListFilters((pre) => ({
          ...pre,
          conferenceType: pre.conferenceType.filter((city) => city !== filter),
        }));
      }
    } else if (name === "conferenceSearchParam") {
      // Handling conference location filter
      if (typeof filter === "string") {
        if (!listFilters.conferenceSearchParam.includes(filter)) {
          setListFilters((pre) => ({
            ...pre,
            conferenceSearchParam: filter,
          }));
        } else {
          setListFilters((pre) => ({
            ...pre,
            conferenceSearchParam: "",
          }));
        }
      }
    } else if (name === "conferenceRandomDate") {
      // Handling conference location filter
      if (typeof filter === "string") {
        if (!listFilters.conferenceRandomDate.includes(filter)) {
          setListFilters((pre) => ({
            ...pre,
            conferenceRandomDate: filter,
          }));
        } else {
          setListFilters((pre) => ({
            ...pre,
            conferenceRandomDate: "",
          }));
          setModalFilters((pre) => ({
            ...pre,
            conferenceRandomDate: "",
          }));
        }
      }
    }
  };

  // function to apply the filters which we select in filter model in mobile and tab screen
  const handleApplyModalFilters = (): void => {
    setListFilters((pre) => ({
      ...pre,
      conferenceDate: modalFilters.conferenceDate,
      conferenceCities: modalFilters.conferenceCities,
      conferenceRandomDate: modalFilters.conferenceRandomDate,
      conferenceEntryFee: modalFilters.conferenceEntryFee,
    }));
  };

  // Function to handle pagination next page
  const handleNextPage = (): void => {
    if (conferenceList?.list.length === 5) {
      setPageNumber(pageNumber + 1);
      setPaginationStates({
        firstPage:
          pageNumber < 2
            ? { display: `1`, value: 1 }
            : {
                display: "..",
                value: Number(paginationStates.firstPage.value) + 1,
              },
        secondPage:
          pageNumber < 2
            ? { display: `2`, value: 2 }
            : {
                display: `${pageNumber + 2}`,
                value: Number(paginationStates.secondPage.value) + 1,
              },
        thirdPage:
          pageNumber < 2
            ? { display: `3`, value: 3 }
            : {
                display: `${pageNumber + 3}`,
                value: Number(paginationStates.thirdPage) + 1,
              },
      });
    }
  };

  // Function to handle pagination previous page
  const handlePreviousPage = (): void => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
      setPaginationStates({
        firstPage:
          pageNumber > 2
            ? { display: `..`, value: Number(paginationStates.firstPage) - 1 }
            : { display: `1`, value: 1 },
        secondPage:
          pageNumber > 2
            ? { display: `${pageNumber}`, value: pageNumber }
            : { display: `2`, value: 2 },
        thirdPage:
          pageNumber > 2
            ? {
                display: `${pageNumber + 1}`,
                value: Number(paginationStates.thirdPage) - 1,
              }
            : { display: `3`, value: 3 },
      });
    }
  };

  // function when we click first page
  const handlePageChange = (state: string): void => {
    if (state === "first") {
      if (pageNumber < 2) {
        setPageNumber(0);
      } else {
        setPageNumber(0);
        setPaginationStates({
          firstPage: { display: "1", value: 1 },
          secondPage: { display: "2", value: 2 },
          thirdPage: { display: "3", value: 3 },
        });
      }
    } else if (state === "second") {
      if (pageNumber < 2) {
        setPageNumber(1);
      }
    } else if (state === "third") {
      if (pageNumber < 2) {
        setPageNumber(2);
      } else {
        setPageNumber(pageNumber + 1);
        setPaginationStates({
          firstPage: { display: "..", value: pageNumber + 1 },
          secondPage: { display: `${pageNumber + 2}`, value: pageNumber + 2 },
          thirdPage: { display: `${pageNumber + 3}`, value: pageNumber + 3 },
        });
      }
    }
  };

  // Function to clear all filters and reset page number
  const clearFilters = (): void => {
    setPageNumber(0);
    setSearchFilter("");
    setSearchLocation("");
    setListFilters({
      conferenceType: [],
      conferenceSearchParam: "",
      conferenceDate: [],
      conferenceEntryFee: [],
      conferenceCities: [],
      conferenceRandomDate: "",
    });
    setTopicFilter("");
    setSearchFilter("");
  };

  // Fetch topics once on component mount
  useEffect(() => {
    if (
      !conferenceDates &&
      !conferenceTopics &&
      !conferenceLocations &&
      !conferenceEntryFee
    ) {
      getTopics();
      getDates();
      getLocations();
      getConferenceFee();
    }
  }, []);

  // Fetch conference list when the filter changes changes
  useEffect(() => {
    setConferenceList({
      count: 0,
      list: [],
    });
    getConferenceLists();
  }, [listFilters, pageNumber]);

  return (
    <>
      {isLoading?.conferenceDates === false &&
      isLoading?.conferenceTopics === false &&
      isLoading?.conferencePrices === false &&
      isLoading?.conferenceLocations === false ? (
        <div className={`${styles.conferenceScreen}`}>
          {/* Search Section */}
          <div className={`container-fluid p-lg-4 p-3 ${styles.searchSection}`}>
            {/* Search Form */}
            <div className="container mt-5 pt-lg-4 pt-0 d-flex flex-row">
              <div className={`${styles.searchSide}`}>
                {/* Search Input */}
                <div
                  className={`input-group rounded form-control p-0 ${styles.searchbar}`}
                >
                  <div className={`input-group-prepend px-3 d-lg-block d-none`}>
                    <div className="d-flex align-items-center justify-content-center h-100 w-100">
                      <FontAwesomeIcon icon={faSearch} color="#9CA2AC" />
                    </div>
                  </div>
                  <input
                    type="search"
                    className={`form-control text-truncate me-1 border-0 h-100  ${
                      searchFilter.length > 0 && "bg-none"
                    }`}
                    placeholder="Search by name, city or topic"
                    name="conferenceSearchParam"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    autoComplete="off"
                  />
                  <div
                    onClick={() => handleConferenceSearch()}
                    className={`input-group-append h-100 btn btn-primary  d-flex align-items-center justify-content-center d-block d-lg-none`}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </div>
                {/* Topic Filter */}
                <select
                  className={`form-select text-truncate mt-4 mt-lg-0 d-lg-block d-none ${styles.selectTopic}`}
                  aria-label="Default select example"
                  onChange={(e) => {
                    setTopicFilter(e.target.value);
                    e.target.value !== "" &&
                      !listFilters.conferenceType.includes(e.target.value) &&
                      setListFilters((pre) => ({
                        ...pre,
                        conferenceType: [...pre.conferenceType, e.target.value],
                      }));
                    e.target.value === "" &&
                      setListFilters((pre) => ({
                        ...pre,
                        conferenceType: [],
                      }));
                  }}
                  value={topicFilter}
                >
                  <option value="">Select...</option>
                  {conferenceTopics &&
                    conferenceTopics?.length > 0 &&
                    conferenceTopics?.map((topic, index) => (
                      <option value={topic.type} key={index}>
                        {topic.type}
                      </option>
                    ))}
                </select>
              </div>
              {/* Search Button */}
              <div className={`${styles.buttonSide} d-lg-block d-none`}>
                <button
                  type="button"
                  className={`btn btn-primary  ${styles.searchBtn}`}
                  onClick={() => handleConferenceSearch()}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Conference List */}
          <div className="container mt-4">
            <div className={`${styles.conferenceSections}`}>
              <div className={`${styles.conferenceSide}`}>
                <div className="row">
                  <div className={`d-block d-lg-none ${styles.displayFilters}`}>
                    <div className="row ">
                      <div
                        className={`col-sm-10 col-8 d-flex align-items-center flex-nowrap  gap-3 ${styles.scrollBarX}`}
                      >
                        {conferenceTopics?.map((topic, ind) => (
                          <div
                            key={ind}
                            className={`gap-2 ${styles.filters}`}
                            onClick={() => {
                              topic?.type !== "" &&
                                !listFilters.conferenceType.includes(
                                  topic?.type,
                                ) &&
                                setListFilters((pre) => ({
                                  ...pre,
                                  conferenceType: [
                                    ...pre.conferenceType,
                                    topic?.type,
                                  ],
                                }));
                            }}
                          >
                            {topic?.type}
                          </div>
                        ))}
                      </div>
                      {/*Filter button*/}
                      <div className="col-sm-2 col-4  ">
                        <div
                          data-bs-toggle="modal"
                          data-bs-target="#filterModal"
                          className="h-100 d-flex align-items-center justify-content-center bg-white w-100 text-danger text-center gap-1"
                          style={{ cursor: "default" }}
                        >
                          Filters{" "}
                          <FontAwesomeIcon size={"sm"} icon={faFilter} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`row ${styles.displayFilters}`}>
                    {/* Filters */}
                    <div
                      className={`col-sm-10 12 col-12 d-flex align-items-center flex-nowrap  gap-3 ${styles.scrollBarX}`}
                    >
                      {/* Selected Conference Type */}
                      {listFilters?.conferenceType &&
                        listFilters?.conferenceType?.length > 0 && (
                          <>
                            {listFilters?.conferenceType?.map((topic, ind) => (
                              <div
                                key={ind}
                                className={`border gap-2 ${styles.filters}`}
                              >
                                {topic}
                                <FontAwesomeIcon
                                  icon={faXmark}
                                  onClick={() => {
                                    setListFilters((pre) => ({
                                      ...pre,
                                      conferenceType: pre.conferenceType.filter(
                                        (type) => type !== topic,
                                      ),
                                    }));
                                    topic === topicFilter && setTopicFilter("");
                                  }}
                                />
                              </div>
                            ))}
                          </>
                        )}
                      {/* Selected Conference Dates */}
                      {listFilters?.conferenceDate &&
                        listFilters?.conferenceDate?.length > 0 &&
                        listFilters?.conferenceDate?.map((date, index) => (
                          <div
                            className={`border gap-2 ${styles.filters}`}
                            key={index}
                          >
                            <span>{date.name}</span>
                            <FontAwesomeIcon
                              icon={faXmark}
                              onClick={() =>
                                handleFilterChange(date, "conferenceDate")
                              }
                            />
                          </div>
                        ))}
                      {/* Selected Conference Entry Fee */}
                      {listFilters?.conferenceEntryFee &&
                        listFilters?.conferenceEntryFee.length > 0 &&
                        listFilters?.conferenceEntryFee?.map((fee, index) => (
                          <div
                            className={`border gap-2 ${styles.filters}`}
                            key={index}
                          >
                            {fee?.displayName}
                            <FontAwesomeIcon
                              icon={faXmark}
                              onClick={() => handleFilterChange(fee, "ticket")}
                            />
                          </div>
                        ))}
                      {/* Selected Conference Locations */}
                      {listFilters?.conferenceCities &&
                        listFilters?.conferenceCities?.length > 0 &&
                        listFilters?.conferenceCities?.map((param, index) => (
                          <div
                            className={`border gap-2 ${styles.filters}`}
                            key={index}
                          >
                            {param?.name}
                            <FontAwesomeIcon
                              icon={faXmark}
                              onClick={() =>
                                handleFilterChange(param, "conferenceLocation")
                              }
                            />
                          </div>
                        ))}
                      {/*Selected search param*/}
                      {listFilters?.conferenceSearchParam && (
                        <div className={`border gap-2 ${styles.filters}`}>
                          {listFilters?.conferenceSearchParam}
                          <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => {
                              handleFilterChange(
                                listFilters?.conferenceSearchParam,
                                "conferenceSearchParam",
                              );
                              setSearchFilter("");
                            }}
                          />
                        </div>
                      )}
                      {/*Selected random date*/}
                      {listFilters?.conferenceRandomDate && (
                        <div className={`border gap-2 ${styles.filters}`}>
                          {listFilters?.conferenceRandomDate}
                          <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() =>
                              handleFilterChange(
                                listFilters?.conferenceRandomDate,
                                "conferenceRandomDate",
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                    {/* Clear Filters Button */}
                    <div className="col-sm-2 col-5 d-none d-lg-block">
                      <div className="d-flex align-items-center h-100">
                        {(listFilters?.conferenceCities?.length > 0 ||
                          listFilters?.conferenceDate?.length > 0 ||
                          listFilters?.conferenceEntryFee?.length > 0 ||
                          listFilters?.conferenceRandomDate !== "" ||
                          listFilters?.conferenceSearchParam !== "" ||
                          listFilters?.conferenceType?.length > 0) && (
                          <h6
                            className="bg-white w-100 text-danger text-center"
                            onClick={() => clearFilters()}
                            style={{ cursor: "default" }}
                          >
                            Clear All
                          </h6>
                        )}
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="filterModal"
                      tabIndex={-1}
                      aria-labelledby="filterModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <div className=" rounded">
                              <div className="accordion" id="accordionExample">
                                {/* Date Filter */}
                                <div className="accordion-item ">
                                  <h2
                                    className="accordion-header border-bottom"
                                    id="headingOne"
                                  >
                                    <button
                                      className="accordion-button"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseOne"
                                      aria-expanded="true"
                                      aria-controls="collapseOne"
                                    >
                                      Date
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body">
                                      <div className="col-12 mb-3">
                                        <input
                                          defaultValue="01-01-1997"
                                          type="date"
                                          className="form-control"
                                          min={`${new Date().getFullYear()}-${String(
                                            new Date().getMonth() + 1,
                                          ).padStart(2, "0")}-${String(
                                            new Date().getDate(),
                                          ).padStart(2, "0")}`}
                                          onChange={(e) =>
                                            modalFilterChange(
                                              e.target.value,
                                              "conferenceRandomDate",
                                            )
                                          }
                                        />
                                      </div>
                                      {
                                        <div
                                          className={`${styles.filterSection}`}
                                        >
                                          {/* Conference Dates Filter */}

                                          {conferenceDates &&
                                            conferenceDates?.length > 0 &&
                                            conferenceDates?.map(
                                              (day, index) => (
                                                <div
                                                  className="col-12  p-1"
                                                  key={index}
                                                >
                                                  <div className="form-check">
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      onChange={() =>
                                                        modalFilterChange(
                                                          day,
                                                          "conferenceDate",
                                                        )
                                                      }
                                                      checked={modalFilters?.conferenceDate.includes(
                                                        day,
                                                      )}
                                                      value={day?.value}
                                                      name="conferenceDate"
                                                      id="flexCheckChecked"
                                                    />
                                                    <label
                                                      className={`form-check-label ${styles.filterLabel}`}
                                                      htmlFor="flexCheckChecked"
                                                    >
                                                      {day?.name}
                                                    </label>
                                                  </div>
                                                </div>
                                              ),
                                            )}
                                        </div>
                                      }
                                    </div>
                                  </div>
                                </div>
                                {/* Location Filter */}
                                <div className="accordion-item">
                                  <h2
                                    className="accordion-header"
                                    id="headingTwo"
                                  >
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseTwo"
                                      aria-expanded="false"
                                      aria-controls="collapseTwo"
                                    >
                                      Location
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body">
                                      <div className="row">
                                        <div className="col-12 p-0">
                                          <input
                                            type="search"
                                            className={`form-control ${styles.serchInputioc}`}
                                            placeholder="Search location"
                                            onChange={(e) =>
                                              setSearchLocation(e.target.value)
                                            }
                                          />
                                        </div>
                                        {/* Conference Cities Filter */}
                                        <div
                                          className={`${styles.filterSection}`}
                                        >
                                          {conferenceLocations
                                            ?.filter(
                                              (city) =>
                                                city?.name
                                                  .toLowerCase()
                                                  .includes(
                                                    searchLocation.toLowerCase(),
                                                  ),
                                            )
                                            ?.map((city, index) => (
                                              <div
                                                className="col-12  p-1"
                                                key={index}
                                              >
                                                <div className="form-check mt-2">
                                                  <input
                                                    className="form-check-input"
                                                    name="conferenceLocation"
                                                    onChange={() =>
                                                      modalFilterChange(
                                                        city,
                                                        "conferenceLocation",
                                                      )
                                                    }
                                                    checked={modalFilters?.conferenceCities.includes(
                                                      city,
                                                    )}
                                                    type="checkbox"
                                                    id="flexCheckChecked"
                                                  />
                                                  <label
                                                    className={`form-check-label ${styles.filterLabel}`}
                                                    htmlFor="flexCheckChecked"
                                                  >
                                                    {city?.name}
                                                  </label>
                                                </div>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* Entry Fee Filter */}
                                <div className="accordion-item">
                                  <h2
                                    className="accordion-header"
                                    id="headingThree"
                                  >
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseThree"
                                      aria-expanded="false"
                                      aria-controls="collapseThree"
                                      id="filterAccordion"
                                    >
                                      Entry fee
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body border-bottom">
                                      {/* Conference Entry Fee Filter */}
                                      <div
                                        className={`${styles.filterSection}`}
                                      >
                                        {conferenceEntryFee?.map(
                                          (fee, index) => (
                                            <div
                                              className="col-12  p-1"
                                              key={index}
                                            >
                                              <div className="form-check ">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  onChange={() =>
                                                    modalFilterChange(
                                                      fee,
                                                      "conferenceEntryFee",
                                                    )
                                                  }
                                                  checked={modalFilters?.conferenceEntryFee.includes(
                                                    fee,
                                                  )}
                                                  name="ticket"
                                                  id="flexCheckChecked"
                                                />
                                                <label
                                                  className={`form-check-label ${styles.filterLabel}`}
                                                  htmlFor="flexCheckChecked"
                                                >
                                                  {fee?.displayName}
                                                </label>
                                              </div>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-light"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-light text-danger"
                              onClick={() => handleApplyModalFilters()}
                              data-bs-dismiss="modal"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isLoading?.conferenceLists === false ? (
                    <>
                      <div className={`mt-2 ${styles.listSection}`}>
                        {/* Conference List Items */}
                        {conferenceList?.list &&
                        conferenceList?.list?.length > 0 ? (
                          conferenceList?.list?.map((list, index) => (
                            <div
                              key={index}
                              className={`container px-sm-3 mt-3 ${styles.cardMain}`}
                            >
                              <div
                                className={`row p-lg-0 d-flex align-items-center ${styles.listItem}`}
                              >
                                <div className="col-lg-4 12 p-0 px-lg-1 pl-lg-0 ">
                                  <img
                                    src={images.ConferenceImage}
                                    className={`img d-lg-block d-none ${styles.listImageLg}`}
                                    alt=""
                                  />
                                  <img
                                    src={images.conferenceImageSmall}
                                    className={`img d-lg-none w-100 d-block ${styles.listImageSm}`}
                                    alt=""
                                  />
                                </div>
                                <div className="col-lg-8 12 px-1 pl-lg-4 pr-lg-4">
                                  <div className={`row ${styles.listName}`}>
                                    <h2>
                                      <Link
                                        className="text-dark"
                                        to={`/conferencedetails/${encryptData(
                                          list?._id,
                                        )}`}
                                      >
                                        {list?.name}
                                      </Link>
                                    </h2>
                                  </div>
                                  <div
                                    className={`row w-100 mt-2 d-none d-lg-block`}
                                  >
                                    <p className={`${styles.listHeadings}`}>
                                      {list?.description}
                                    </p>
                                  </div>
                                  <div
                                    className={` ${styles.scrollBarX} d-flex flex-nowrap gap-2`}
                                  >
                                    {list?.type?.map(
                                      (val: string, ind: number) => (
                                        <div
                                          key={ind}
                                          className="h-100 d-flex align-items-center rounded"
                                        >
                                          <span
                                            key={ind}
                                            className={`p-1 rounded text-center ${styles.type}`}
                                          >
                                            {val}
                                          </span>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                  <div className="row mt-3 pt-2 border-top">
                                    <div className="col-lg-9 12">
                                      <div className="row mt-2">
                                        <div className="col-lg-1 12">
                                          <div className="d-none d-lg-block">
                                            <img src={images.locationIcon} />
                                          </div>
                                        </div>
                                        <div
                                          className={`col-lg-11 12 gap-3 ${styles.scrollBarX} d-flex flex-nowrap h-100`}
                                        >
                                          {list?.city?.map(
                                            (name: string, i: number) => (
                                              <div
                                                key={i}
                                                className={`${styles.itemCities}`}
                                              >
                                                {name}
                                              </div>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                      <div className="row mt-3 ">
                                        <div className="col-lg-1 12 d-none d-lg-block">
                                          <div className="d-flex align-items-center justify-content-center h-100">
                                            <img src={images.calendarIcon} />
                                          </div>
                                        </div>
                                        <div
                                          className={`col-lg-11 12 gap-3 ${styles.scrollBarX} d-flex flex-nowrap h-100`}
                                        >
                                          <div className={`d-none d-lg-block`}>
                                            <div
                                              className={`gap-2 d-flex align-items-center`}
                                            >
                                              <div
                                                className={`${styles.conferenceDate}`}
                                              >
                                                {shortDateFormat(
                                                  list?.startDate,
                                                  list?.endDate,
                                                )}
                                              </div>
                                              <div
                                                className={`${styles.conferenceMonth}`}
                                              >
                                                {shortMonthFormat(
                                                  list?.startDate,
                                                )}
                                              </div>
                                              <div
                                                className={`${styles.itemTimings} text-truncate border-left ps-3`}
                                              >
                                                {list?.fromTime} -{" "}
                                                {list?.toTime}
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className={`d-block d-lg-none ${styles.dateTag} rounded-pill`}
                                          >
                                            {new Date(list?.startDate)
                                              .getDate()
                                              .toFixed(0)}{" "}
                                            {`${new Date(
                                              list?.startDate,
                                            ).toLocaleString("default", {
                                              month: "short",
                                            })}`}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="d-none d-lg-block">
                                        <div className="row mt-3">
                                          <div className="col-lg-1 12">
                                            <div className="d-flex align-items-center justify-content-center h-100">
                                              <img src={images.rupeeIcon} />
                                            </div>
                                          </div>
                                          <div className="col-lg-11 12 d-flex align-items-center">
                                            <div
                                              className={`d-none d-lg-block`}
                                            >
                                              <span
                                                className={`${styles.conferencePrices}`}
                                              >
                                                {list?.ticketPrice}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-3 12 d-flex align-items-center justify-content-center">
                                      {/* Link to Conference Details */}
                                      <Link
                                        to={`/conferencedetails/${encryptData(
                                          list?._id,
                                        )}`}
                                        state={{ from: "Conferences" }}
                                        className={styles.detailsLink}
                                      >
                                        <button
                                          type="button"
                                          className={`btn ${styles.detailsBtn} text-center d-none d-lg-block`}
                                        >
                                          Details
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <h2
                            className="text-center mt-5"
                            style={{ color: "#dc3545" }}
                          >
                            No Conferences found for the Search Criteria
                          </h2>
                        )}
                      </div>
                      <div className="row d-flex justify-content-center align-items-center mt-3">
                        {/* Pagination */}
                        <nav
                          aria-label="Page navigation example"
                          className="mt-5 d-flex justify-content-center align-items-center"
                        >
                          <ul className="pagination gap-2">
                            <li
                              className={`page-item ${
                                pageNumber === 0 && "disabled"
                              } rounded-circle`}
                              style={{
                                cursor: `${
                                  pageNumber === 0 ? "not-allowed" : "pointer"
                                }`,
                              }}
                              onClick={() => handlePreviousPage()}
                            >
                              <a
                                className="page-link  border rounded-circle"
                                href="#"
                                aria-disabled="true"
                              >
                                <FontAwesomeIcon icon={faChevronLeft} />
                              </a>
                            </li>
                            <li
                              className={`page-item rounded-circle`}
                              onClick={() => handlePageChange("first")}
                            >
                              <a
                                className={`page-link border rounded-circle ${
                                  pageNumber === 0 && "text-danger bg-light"
                                }`}
                                href="#"
                              >
                                {paginationStates.firstPage.display}
                              </a>
                            </li>
                            <li
                              className={`page-item rounded-circle bg-light`}
                              onClick={() => handlePageChange("second")}
                            >
                              <a
                                className={`page-link border rounded-circle ${
                                  ((pageNumber >= 2 &&
                                    paginationStates.firstPage.display ===
                                      "..") ||
                                    pageNumber === 1) &&
                                  "text-danger bg-light"
                                }`}
                                href="#"
                              >
                                {paginationStates.secondPage.display}
                              </a>
                            </li>
                            <li
                              value={pageNumber < 3 ? 3 : pageNumber + 1}
                              className={`page-item rounded-circle`}
                              onClick={() =>
                                pageNumber !== 2 && handlePageChange("third")
                              }
                            >
                              <a
                                className={`page-link border rounded-circle ${
                                  ((pageNumber === 2 &&
                                    paginationStates.thirdPage.display !==
                                      "4") ||
                                    (conferenceList &&
                                      conferenceList?.list.length < 5)) &&
                                  "bg-light text-danger"
                                }`}
                                href="#"
                              >
                                {paginationStates.thirdPage.display}
                              </a>
                            </li>
                            <li
                              className={`page-item ${
                                conferenceList &&
                                conferenceList?.list.length < 5 &&
                                "disabled"
                              } rounded-circle`}
                              onClick={() => handleNextPage()}
                            >
                              <a
                                className="page-link border rounded-circle"
                                href="#"
                                aria-disabled="true"
                              >
                                <FontAwesomeIcon icon={faChevronRight} />
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </>
                  ) : (
                    <ConferenceListSkeleton />
                  )}
                </div>
              </div>
              <div className={`${styles.filterSide}`}>
                {/* Filters Section */}
                <div className={`d-none d-lg-block`}>
                  <div className={`d-flex  justify-content-center`}>
                    <div
                      className={`accordion ${styles.filtersAccordion}`}
                      id="accordionExample"
                    >
                      {/* Date Filter */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            id="filterAccordion"
                            onClick={(e) => {
                              window.scrollTo({
                                top: e.currentTarget.offsetTop - 20,
                                behavior: "smooth",
                              });
                            }}
                          >
                            Date
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="col-12 mb-3">
                              <input
                                type="date"
                                className="form-control"
                                min={`${new Date().getFullYear()}-${String(
                                  new Date().getMonth() + 1,
                                ).padStart(2, "0")}-${String(
                                  new Date().getDate(),
                                ).padStart(2, "0")}`}
                                onChange={(e) =>
                                  handleFilterChange(
                                    e.target.value,
                                    "conferenceRandomDate",
                                  )
                                }
                              />
                            </div>
                            <div className={`${styles.filterSection}`}>
                              {/* Conference Dates Filter */}
                              {conferenceDates &&
                                conferenceDates?.length > 0 &&
                                conferenceDates?.map((day, index) => (
                                  <div className="col-12  p-1" key={index}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={() =>
                                          handleFilterChange(
                                            day,
                                            "conferenceDate",
                                          )
                                        }
                                        checked={listFilters?.conferenceDate.includes(
                                          day,
                                        )}
                                        value={day?.value}
                                        name="conferenceDate"
                                        id="flexCheckChecked"
                                      />
                                      <label
                                        className={`form-check-label ${styles.filterLabel}`}
                                        htmlFor="flexCheckChecked"
                                      >
                                        {day?.name}
                                      </label>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Location Filter */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                            id="filterAccordion"
                            onClick={(e) => {
                              window.scrollTo({
                                top: e.currentTarget.offsetTop - 20,
                                behavior: "smooth",
                              });
                            }}
                          >
                            Location
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="row">
                              <div className="col-12 mb-3">
                                <input
                                  type="search"
                                  className={`form-control ${styles.serchInputioc} text-truncate`}
                                  placeholder="Search location.."
                                  onChange={(e) =>
                                    setSearchLocation(e.target.value)
                                  }
                                />
                              </div>
                              {/* Conference Cities Filter */}
                              <div className={`${styles.filterSection}`}>
                                {conferenceLocations
                                  ?.filter(
                                    (city) =>
                                      city?.name
                                        .toLowerCase()
                                        .includes(searchLocation.toLowerCase()),
                                  )
                                  ?.map((city, index) => (
                                    <div className="col-12  p-1" key={index}>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          name="conferenceLocation"
                                          onChange={() =>
                                            handleFilterChange(
                                              city,
                                              "conferenceLocation",
                                            )
                                          }
                                          checked={listFilters?.conferenceCities.includes(
                                            city,
                                          )}
                                          type="checkbox"
                                          id="flexCheckChecked"
                                        />
                                        <label
                                          className={`form-check-label ${styles.filterLabel}`}
                                          htmlFor="flexCheckChecked"
                                        >
                                          {city?.name}
                                        </label>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Entry Fee Filter */}
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                            id="filterAccordion"
                            onClick={(e) => {
                              window.scrollTo({
                                top: e.currentTarget.offsetTop - 20,
                                behavior: "smooth",
                              });
                            }}
                          >
                            Entry fee
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body border-bottom">
                            {/* Conference Entry Fee Filter */}
                            <div className={`${styles.filterSection}`}>
                              {conferenceEntryFee?.map((fee, index) => (
                                <div className="col-12  p-1" key={index}>
                                  <div className="form-check ">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      onChange={() =>
                                        handleFilterChange(fee, "ticket")
                                      }
                                      checked={listFilters?.conferenceEntryFee.includes(
                                        fee,
                                      )}
                                      name="ticket"
                                      id="flexCheckChecked"
                                    />
                                    <label
                                      className={`form-check-label ${styles.filterLabel}`}
                                      htmlFor="flexCheckChecked"
                                    >
                                      {fee?.displayName}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ConferencesSkeleton />
        </div>
      )}
    </>
  );
};

export default ConferenceLists;
