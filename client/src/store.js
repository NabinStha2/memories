import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducers } from "./reducers/authReducers";
import { postsReducer } from "./reducers/postsReducers";

const reducer = combineReducers({
  post: postsReducer,
  auth: authReducers,
});

const userInfoFromStorage = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;
// console.log(userInfoFromStorage);
const initialState = {
  post: {
    posts: [],
    postOne: null,
  },
  auth: {
    userData: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
