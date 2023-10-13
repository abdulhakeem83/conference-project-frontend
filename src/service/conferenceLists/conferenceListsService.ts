{
  /*eslint-disable*/
}
import { errorHandler } from "utils/toaster/toaster";
import { apiWrapper } from "../apiWrapper.service";

//api service for getting conference lists
export const getConferenceList = async (
  pageNumber: number,
  filters: object | undefined,
  limit: number,
) => {
  try {
    const response = await apiWrapper.post(
      `/conferenceList?pageNumber=${pageNumber}&limit=${limit}`,
      filters,
    );
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};
//api service for getting conference topics
export const getConferenceTopics = async () => {
  try {
    const response = await apiWrapper.get("/conferenceTopics");
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};
//api service for getting conference dates
export const getconferenceDates = async () => {
  try {
    const response = await apiWrapper.get("/conferenceDates");
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};
//api service for getting conference cities
export const getConferenceLocations = async () => {
  try {
    const response = await apiWrapper.get("/conferenceLocation");
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};
//api service for getting conference prices
export const getConferencePrices = async () => {
  try {
    const response = await apiWrapper.get("/conferencePrices");
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};
