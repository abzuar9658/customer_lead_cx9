import * as actionTypes from "./types";
import axios from "axios";
//const url = "http://192.168.50.102:5000/api";
const url = "http://192.168.50.140:5000/api";

const loginLoading = () => {
  return {
    type: actionTypes.LOGIN_LOADING,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const login = (body) => async (dispatch) => {
  const { username, password } = body;
  dispatch(loginLoading());
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.post(`${url}/login`, { username, password });
    dispatch({
      type: actionTypes.LOGIN_LOAD_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_LOAD_FAIL,
      payload: error.message,
    });
  }
};

const companiesLoading = () => {
  return {
    type: actionTypes.COMPANIES_LOADING,
  };
};

export const getCompanies = (body) => async (dispatch) => {
  const { name, email, phone, weblink } = body;
  dispatch(companiesLoading());
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.post(
      `${url}/companies`,
      {
        name: name ? name.toLowerCase() : "",
        email: email ? email.toLowerCase() : "",
        phone,
        weblink: weblink ? weblink.toLowerCase() : "",
      },
      config
    );
    dispatch({
      type: actionTypes.COMPANIES_LOAD_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.COMPANIES_LOAD_FAIL,
      payload: error.message,
    });
  }
};

const leadsLoading = () => {
  return {
    type: actionTypes.LEADS_LOADING,
  };
};

export const getLeads = (body) => async (dispatch) => {
  const { companyId } = body;
  try {
    dispatch(leadsLoading());
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.post(
      `${url}/leads`,
      {
        companyId,
      },
      config
    );
    dispatch({
      type: actionTypes.LEADS_LOAD_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LEADS_LOAD_FAIL,
      payload: error.message,
    });
  }
};

export const clearLeads = () => {
  return {
    type: actionTypes.LEADS_CLEAR,
  };
};
