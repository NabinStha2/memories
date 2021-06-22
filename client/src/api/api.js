import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://memoriesweb.herokuapp.com",
});

export const fetchPostsApi = (searchQuery, pageNumber, noPage) => {
  return axiosApi.get(
    `/posts?memories=${searchQuery.memories}&tags=${searchQuery.tags}&page=${pageNumber}&noPage=${noPage}`
  );
};

export const fetchPostByIdApi = (id) => {
  return axiosApi.get(`/posts/${id}`);
};

export const fetchPostByCreatorApi = (name) => {
  return axiosApi.get(`/posts/creators/${name}`);
};

export const commentApi = (value, id) =>
  axiosApi.post(`/posts/${id}/commentPost`, { value });

export const createPostApi = (newPost, token) => {
  return axiosApi.post("/posts", newPost, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePostApi = (newPost, currentId, token) => {
  return axiosApi.patch(`/posts/${currentId}`, newPost, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePostApi = (currentId, token) => {
  return axiosApi.delete(`/posts/${currentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const likePostApi = (id, token) => {
  return axiosApi.patch(
    `/posts/like/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const loginUserApi = (formData) => {
  return axiosApi.post("/user/login", formData);
};

export const registerUserApi = (formData) => {
  return axiosApi.post("/user/signup", formData);
};
