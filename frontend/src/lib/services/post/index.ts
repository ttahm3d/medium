import axiosInstance from "../axiosConfig";
import {
  SigninInput,
  SignupInput,
  CreateBlogInput,
  updateBlogInputBlogInput,
} from "@ttahm3d/medium-blog-ttahm3d-types";

export const postSignIn = async (signin: SigninInput) => {
  try {
    const response = await axiosInstance.post("/user/signin", { ...signin });
    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem("token", token);
    }
  } catch (e) {
    console.error(e);
  }
};

export const postSignUp = async (signup: SignupInput) => {
  try {
    const response = await axiosInstance.post("/user/signup", {
      ...signup,
    });
    if (response.status === 201) {
      const token = response.data.token;
      localStorage.setItem("token", token);
    }
  } catch (e) {
    console.error(e);
  }
};

export const postBlog = async (blog: CreateBlogInput) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      "/blog",
      {
        blog,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateBlog = async (blog: updateBlogInputBlogInput) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(
      "/blog",
      {
        blog,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
