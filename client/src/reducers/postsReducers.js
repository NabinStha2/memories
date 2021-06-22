export const postsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "START_LOADING_COMMENT":
      return { ...state, isLoadingComment: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "END_LOADING_COMMENT":
      return { ...state, isLoadingComment: false };
    case "FETCH_ALL_POST":
      return {
        ...state,
        posts: action.payload.posts,
        pages: action?.payload?.pages,
        page: action?.payload?.page,
      };
    case "FETCH_POST":
      return {
        ...state,
        postOne: action.payload,
      };
    case "FETCH_BY_CREATOR":
      return {
        ...state,
        posts: action.payload,
      };
    case "CREATE_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        errMessage: action.payload?.errMessage,
      };
    case "COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.id),
      };
    case "LIKE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};
