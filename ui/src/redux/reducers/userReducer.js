import {
  API_FAILED,
  API_INIT,
  API_SUCCESS,
  STATE_RESET,
  USER_LOGIN,
  USER_LOGOUT,
} from "../types";

const initial_state = {
  loading: false,
  error: false,
  message: "",
  auth: {},
  redirect: false,
};

const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case API_INIT:
      return {
        ...state,
        loading: true,
      };
    case API_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true,
      };
    case API_FAILED:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: true,
      };
    case USER_LOGIN:
      return {
        ...state,
        auth: { ...action.payload },
      };
    case STATE_RESET:
      return {
        ...state,
        error: false,
        message: "",
        redirect: false,
      };
    case USER_LOGOUT:
      return initial_state;
    default:
      return state;
  }
};

export default userReducer;
