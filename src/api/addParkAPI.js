import axiosInstance from "./axiosInstance";

export const ge = async () => {
  const response = await axiosInstance.get(`/api/kongju/parking/register`);
  return response.data;
};
