import axiosInstance from "../axiosConfig";

export const getBlogById = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get(`/blog/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllBlogs = async () => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get(`/blog/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
