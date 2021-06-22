const authReducers = (state = { userData: null }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true, errMessage: null };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "FAILED":
      return { ...state, isLoading: false, errMessage: action.payload };
    case "AUTH":
      //   console.log(action?.payload);
      localStorage.setItem("userData", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        userData: action?.payload,
        errMessage: null,
      };
    case "LOGOUT_AUTH":
      localStorage.removeItem("userData");
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

export { authReducers };
