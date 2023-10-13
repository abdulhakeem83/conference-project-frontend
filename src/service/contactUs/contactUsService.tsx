import { apiWrapper } from "service/apiWrapper.service";
import { contactTypes } from "types/contact";
export const postContactUsDetails = async (body: contactTypes) =>
  await apiWrapper.post(`/contactUs`, body);
