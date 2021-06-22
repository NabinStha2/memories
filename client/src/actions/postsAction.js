import {
  commentApi,
  createPostApi,
  deletePostApi,
  fetchPostByCreatorApi,
  fetchPostByIdApi,
  fetchPostsApi,
  likePostApi,
  updatePostApi,
} from "../api/api";

export const getPosts =
  (
    searchQuery = { memories: "", tags: "" },
    pageNumber = "",
    noPage = "false"
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "START_LOADING" });
      // console.log(noPage);
      if (searchQuery.memories === "" && searchQuery.tags !== "") {
        searchQuery.memories = null;
      }
      const { data } = await fetchPostsApi(searchQuery, pageNumber, noPage);
      // console.log(data);
      // console.log(`data ---- ${data.map((data) => data.title)}`);
      dispatch({
        type: "FETCH_ALL_POST",
        payload: data,
      });

      dispatch({ type: "END_LOADING" });
    } catch (err) {
      dispatch({ type: "END_LOADING" });
      console.error(`${err.message} ----- ${err.code}`);
    }
  };

export const getPostById = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "START_LOADING" });
    // console.log(postId);

    const { data } = await fetchPostByIdApi(postId);
    // console.log(data);
    dispatch({
      type: "FETCH_POST",
      payload: data,
    });

    dispatch({ type: "END_LOADING" });
  } catch (err) {
    dispatch({ type: "END_LOADING" });
    console.error(`${err.message} ----- ${err.code}`);
  }
};

export const getPostsByCreator =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });

      const { data } = await fetchPostByCreatorApi(name);
      console.log(data);
      dispatch({ type: "FETCH_BY_CREATOR", payload: data });

      dispatch({ type: "END_LOADING" });
    } catch (err) {
      dispatch({ type: "END_LOADING" });
      console.error(`${err.message} ----- ${err.code}`);
    }
  };

export const createPost = (postData, history) => async (dispatch, getState) => {
  try {
    dispatch({ type: "START_LOADING" });

    const { userToken } = getState().auth.userData;
    const { data } = await createPostApi(postData, userToken);
    dispatch({
      type: "CREATE_POST",
      payload: data,
    });
    history.push(`/posts/${data._id}`);

    dispatch({ type: "END_LOADING" });
  } catch (err) {
    dispatch({ type: "END_LOADING" });
    console.error(`${err.message} ----- ${err.code}`);
  }
};

export const updatePost =
  (postData, currentId) => async (dispatch, getState) => {
    try {
      const { userToken } = getState().auth.userData;
      const { data } = await updatePostApi(postData, currentId, userToken);
      // console.log(`Data ---- ${data.creator}`);
      dispatch({
        type: "UPDATE_POST",
        payload: data,
      });
    } catch (err) {
      console.error(`${err.message} ----- ${err.code}`);
    }
  };

export const commentPost = (value, id) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING_COMMENT" });
    console.log(value);
    const { data } = await commentApi(value, id);

    dispatch({ type: "COMMENT", payload: data });

    dispatch({ type: "END_LOADING_COMMENT" });
    return data.comments;
  } catch (error) {
    dispatch({ type: "END_LOADING_COMMENT" });
    // console.log(error);
  }
};

export const deletePost = (currentId) => async (dispatch, getState) => {
  try {
    const { userToken } = getState().auth.userData;
    await deletePostApi(currentId, userToken);

    dispatch({
      type: "DELETE_POST",
      payload: { id: currentId },
    });
  } catch (err) {
    console.error(`${err.message} ----- ${err.code}`);
  }
};

export const likePost = (id) => async (dispatch, getState) => {
  try {
    const { userToken } = getState().auth.userData;
    // console.log(userToken);
    const { data } = await likePostApi(id, userToken);

    dispatch({
      type: "LIKE_POST",
      payload: data,
    });
  } catch (err) {
    console.error(`${err.message} ----- ${err.code}`);
  }
};
