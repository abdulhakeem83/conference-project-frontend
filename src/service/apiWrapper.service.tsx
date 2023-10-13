import { axiosInstance } from "./axiosInstance";
export const apiWrapper = {
  put (path: string, data?: object) {
    return axiosInstance.put(`${path}`, data);
  },
  get (path: string, data?: object) {
    return axiosInstance.get(`${path}`, data);
  },
  post (path: string, data?: object) {
    return axiosInstance.post(`${path}`, data);
  },
  delete (path: string, data?: object) {
    return axiosInstance.delete(`${path}`, data);
  },
};
