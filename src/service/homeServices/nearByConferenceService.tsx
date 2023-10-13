import { apiWrapper } from "service/apiWrapper.service";
export const getNearByConferences = async (
  pageNumber: number,
  limit: number,
  filters: object | undefined,
) =>
  await apiWrapper.post(
    `/conferenceList?pageNumber=${pageNumber}&limit=${limit}`,
    filters,
  );
