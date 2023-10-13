{
  /*eslint-disable*/
}
import { errorHandler } from "utils/toaster/toaster";
import { apiWrapper } from "service/apiWrapper.service";
export const getConferenceList = async (
  pageNumber: number,
  limit: number,
  filters: object,
) =>
  await apiWrapper.post(
    `/conferenceList?pageNumber=${pageNumber}&limit=${limit}`,
    filters,
  );

export const getUserIpAddress = async () => {
  try {
    const response = await apiWrapper.get("/ip");
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};
