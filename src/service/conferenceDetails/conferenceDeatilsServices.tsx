import { apiWrapper } from "service/apiWrapper.service";
export const getConferenceDetails = async (id: string) =>
  await apiWrapper.get(`/conferenceDetails?conferenceId=${id}`);
export const getSimilarConferences = async (
  pageNumber: number,
  limit: number,
  filters: object | undefined,
) =>
  await apiWrapper.post(
    `/conferenceList?pageNumber=${pageNumber}&limit=${limit}`,
    filters,
  );
