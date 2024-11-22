import axiosInstance from "./axiosInstance";

export const login = async () => {
  const response = await axiosInstance.get(`/api/kongju/login`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axiosInstance.post("/users", userData);
  return response.data;
};
