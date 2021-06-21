import mainAPIInstance from "../../axios";
import { ErrorNotification } from "../../components";
import { SuccessNotification } from "../../components/Notification";
import {
  API_FAILED,
  API_INIT,
  API_SUCCESS,
  STATE_RESET,
  USER_LOGIN,
  USER_LOGOUT,
} from "../types";

export const loginAction = (params) => {
  return async (dispatch) => {
    try {
      dispatch({ type: API_INIT });
      const { data } = await mainAPIInstance.post("/login", params);
      localStorage.setItem("token", data.token);
      dispatch({ type: USER_LOGIN, payload: data });
      dispatch({ type: API_SUCCESS });
      SuccessNotification("Logged in");
    } catch (err) {
      dispatch({ type: API_FAILED, payload: err.response });
      switch (err.response.status) {
        case 404:
          return ErrorNotification("user invalid");
        case 400:
          return ErrorNotification("Please verify your account");
        default:
          return null;
      }
    }
  };
};

export const registerAction = (params) => {
  return async (dispatch) => {
    try {
      dispatch({ type: API_INIT });
      await mainAPIInstance.post("/register", params);
      dispatch({ type: API_SUCCESS });
      SuccessNotification("Please check your email to verify your account!");
    } catch (err) {
      dispatch({ type: API_FAILED, payload: err.response });
      if (err.response.status === 401) {
        ErrorNotification("email already exists");
      }
    }
  };
};

export const keepLogged = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: API_INIT });
      const { data } = await mainAPIInstance.post("/logged");
      dispatch({ type: USER_LOGIN, payload: data });
      dispatch({ type: API_SUCCESS });
    } catch (err) {
      dispatch({ type: API_FAILED, payload: err.response });
    }
  };
};

export const forgetPasswordAction = () => {
  return async (dispatch) => {
    try {
    } catch (err) {
      dispatch({ type: API_FAILED, payload: err.response });
    }
  };
};

export const stateResetAction = () => {
  return {
    type: STATE_RESET,
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch({ type: USER_LOGOUT });
    } catch (err) {
      dispatch({ type: API_FAILED, payload: err.response });
    }
  };
};

export const verifyAccountAction = (token) => {
  return async (dispatch) => {
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await mainAPIInstance.post(`/activate/${token}`, {}, headers);
      dispatch({ type: API_SUCCESS });
      SuccessNotification("Account Activated!");
    } catch (err) {
      dispatch({ type: API_FAILED, payload: err.response });
    }
  };
};

export const forgotPasswordAction = (email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: API_INIT });
      await mainAPIInstance.post("/forgot-password", { email });
      dispatch({ type: API_SUCCESS });
      SuccessNotification("Email sent!");
    } catch (err) {
      dispatch({ type: API_FAILED, payload: err.response });
    }
  };
};

export const resetPasswordAction = (password, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: API_INIT });
      await mainAPIInstance.post(`/reset-password/${token}`, { password });
      dispatch({ type: API_SUCCESS });
      SuccessNotification("Password reset!");
    } catch (err) {
      dispatch({ type: API_FAILED, payload: err.response });
    }
  };
};
