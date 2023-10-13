import Styles from "./Home.module.css";
import { getConferenceList } from "service/homeServices/conferencesListService";
import { useCallback, useEffect, useState } from "react";
import { conferenceTypes, loaderState } from "types/homeConference";
import { getNearByConferences } from "service/homeServices/nearByConferenceService";
import { errorHandler } from "utils/toaster/toaster";
import { CONSTANTS } from "constants/Constants";
import ReUsableCards from "genericComponents/reusableCards/ReUsableCards";
import useGeoLocation from "customHook/useGeoLocation";
import { listFiltersTypes } from "types/conferenceListsTypes";
import CardPlaceHolders from "genericComponents/cardPlaceholders/CardPlaceHolders";
import TreandingTopics from "./trendingTopics/TrendingTopics";
import AboutSection from "./aboutSection/AboutSection";
import Banner from "./bannerSection/Banner";

const Home = () => {
  const { address } = useGeoLocation();
  const [conferenceList, setConferenceList] = useState<[conferenceTypes]>();
  const [confListCount, setconfListCount] = useState<number>();
  const [nearByConferences, setNearByConferences] =
    useState<[conferenceTypes]>();
  const [nearByConferenceCount, setNearByConferenceCount] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageLocation, setPageLocation] = useState<number>(0);
  const [lazyLoading, setLazyLoading] = useState<boolean>(false);
  const [nearBylazyLoading, setNearByLazyLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<loaderState>({
    nearByConferences: true,
    conferenceList: true,
  });
  const FetchAPIlimit: number = 12;

  const filters: listFiltersTypes = {
    conferenceType: [],
    conferenceSearchParam: "",
    conferenceDate: [],
    conferenceEntryFee: [],
    conferenceCities: [],
    conferenceRandomDate: "",
  };

  // API Call for ConferenceList
  const getConferenceLists = async (): Promise<void> => {
    setLazyLoading(true);
    await getConferenceList(pageNumber, FetchAPIlimit, filters)
      .then((res) => {
        const conferenceListLength = conferenceList ? [...conferenceList] : [];
        {
          conferenceListLength.length === 0
            ? setConferenceList(res?.data?.list)
            : setConferenceList((prevNearByConferences) => {
                const newData = res?.data?.list || [];
                return prevNearByConferences
                  ? [...prevNearByConferences, ...newData]
                  : newData;
              });
        }
        setconfListCount(res?.data?.totalCount);
        setIsLoading((pre: loaderState) => ({
          ...pre,
          conferenceList: false,
        }));
        setLazyLoading(false);
      })
      .catch((err) => errorHandler(err.response.data.message));
  };

  // API Call for Location Based Conferences List

  const getNearByConferenceLists = async (
    nearByfilters: listFiltersTypes,
  ): Promise<void> => {
    setNearByLazyLoading(true);
    await getNearByConferences(pageLocation, FetchAPIlimit, nearByfilters)
      .then(async (res) => {
        if (res?.data?.list?.length > 0) {
          const nearByConferencesListLength = conferenceList
            ? [...conferenceList]
            : [];
          {
            nearByConferencesListLength.length === 0
              ? setNearByConferences(res?.data?.list)
              : setNearByConferences((prevNearByConferences) => {
                  const newData = res?.data?.list || [];
                  return prevNearByConferences
                    ? [...prevNearByConferences, ...newData]
                    : newData;
                });
          }
          setNearByConferenceCount(res?.data?.totalCount);
          setNearByLazyLoading(false);
          setIsLoading((pre) => ({
            ...pre,
            nearByConferences: false,
          }));
        } else {
          filters.conferenceCities = [{ name: "Hyderabad" }];
          await getNearByConferences(pageLocation, FetchAPIlimit, filters)
            .then((result) => {
              const nearByConferencesListLength = conferenceList
                ? [...conferenceList]
                : [];
              {
                nearByConferencesListLength.length === 0
                  ? setNearByConferences(res?.data?.list)
                  : setNearByConferences((prevNearByConferences) => {
                      const newData = res?.data?.list || [];
                      return prevNearByConferences
                        ? [...prevNearByConferences, ...newData]
                        : newData;
                    });
              }
              setNearByConferenceCount(result?.data?.totalCount);
              setIsLoading((pre) => ({
                ...pre,
                nearByConferences: false,
              }));
            })
            .catch((err) => errorHandler(err.response.data.message));
        }
      })
      .catch((err) => errorHandler(err.response.data.message));
  };

  useEffect(() => {
    getConferenceLists();
  }, [pageNumber]);

  useEffect(() => {
    if (address?.city) {
      filters.conferenceCities = [{ name: address?.city }];
      getNearByConferenceLists(filters);
    } else {
      filters.conferenceCities = [{ name: "Hyderabad" }];
      getNearByConferenceLists(filters);
    }
  }, [address?.city, pageLocation]);

  // Pagination for conference list start
  const handleNextPage = useCallback(() => {
    if (
      confListCount &&
      pageNumber < Math.ceil(confListCount / FetchAPIlimit) - 1
    ) {
      setPageNumber(pageNumber + 1);
    }
  }, [confListCount, pageNumber, setPageNumber, FetchAPIlimit]);

  // Pagination for near by location start
  const handleNextLocation = useCallback(() => {
    nearByConferenceCount &&
      pageLocation < Math.ceil(nearByConferenceCount / FetchAPIlimit) - 1 &&
      setPageLocation(pageLocation + 1);
  }, [nearByConferenceCount, pageLocation, setPageLocation]);

  return (
    <>
      {/* banner section starts */}
      <Banner />
      {/* banner section end */}

      {/*conference list  cards displaying through resuable component start*/}
      {isLoading?.conferenceList ? (
        <CardPlaceHolders />
      ) : (
        <div
          className={`container section-padding-tb pt-0 ${Styles.sectionTbP}`}
        >
          {conferenceList && (
            <ReUsableCards
              data={conferenceList || []}
              handleNextPage={handleNextPage}
              pageNumber={pageNumber}
              totalRecords={confListCount}
              from={"Home"}
              lazyLoading={lazyLoading}
              setLazyLoading={setLazyLoading}
              limit={FetchAPIlimit}
            />
          )}
        </div>
      )}
      {/*  end of cards displaying through resuable component end */}

      {/*   about sectiion start */}
      <AboutSection />
      {/*  about section  end */}

      {/* Trending topics starts */}
      <TreandingTopics />
      {/* Trending topics end */}

      {/*conference list based on nearby location cards displaying through resuable component start */}
      {isLoading?.nearByConferences ? (
        <CardPlaceHolders />
      ) : (
        nearByConferences && (
          <div className={`container section-padding-tb ${Styles.sectionTbP}`}>
            {nearByConferences && (
              <>
                <div className="row gy-3">
                  <div
                    className={`col-md-12 mb-b-5 ${Styles.trendTopic} d-flex justify-content-between`}
                  >
                    <h2>{CONSTANTS.HOME_CONFERENCES}</h2>
                  </div>
                </div>
                <ReUsableCards
                  data={nearByConferences || []}
                  handleNextPage={handleNextLocation}
                  pageNumber={pageLocation}
                  totalRecords={nearByConferenceCount}
                  from={"Home"}
                  lazyLoading={nearBylazyLoading}
                  setLazyLoading={setNearByLazyLoading}
                  limit={FetchAPIlimit}
                />
              </>
            )}
          </div>
        )
      )}
      {/*conference list based on nearby location  cards displaying through resuable component end */}
    </>
  );
};
export default Home;
