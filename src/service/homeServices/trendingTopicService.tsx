import { apiWrapper } from "service/apiWrapper.service";
export const getTrendingTopics = async (pageNumber: number, limit: number) =>
  await apiWrapper.get(
    `/conferenceTopics?pageNumber=${pageNumber}&limit=${limit}`,
  );
