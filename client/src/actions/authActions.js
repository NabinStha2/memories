import { loginUserApi, registerUserApi } from "../api/api";

export const login = (formData, history) => async (dispatch, getState) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await loginUserApi(formData);
    // console.log(data);
    dispatch({ type: "AUTH", payload: data });
    dispatch({ type: "END_LOADING" });
    history.push("/");
  } catch (err) {
    dispatch({
      type: "FAILED",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    // console.error(`${err.response.data.message} ----- ${err.code}`);
  }
};

export const register = (formData, history) => async (dispatch, getState) => {
  try {
    dispatch({ type: "START_LOADING" });
    // console.log(formData);
    const { data } = await registerUserApi(formData);
    console.log(data);
    dispatch({ type: "AUTH", payload: data });
    dispatch({ type: "END_LOADING" });
    history.push("/");
  } catch (err) {
    dispatch({
      type: "FAILED",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    // console.error(`${err.response.data.message} ----- ${err.code} `);
  }
};
