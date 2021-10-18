import * as actionTypes from "../actions/types";
const initial_state = {
  data: [],
  isLoading: null,
  isSuccess: null,
  isError: null,
  errorMessage: null,
};

export const authReducer = (state = initial_state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOGIN_LOAD_SUCCESS:
      localStorage.setItem("token", payload.data.data.token);
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.LOGIN_LOAD_FAIL:
      return {
        ...state,
        data: null,
        isSuccess: false,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        isError: false,
        errorMessage: null,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("token");
      return initial_state;

    default:
      return state;
  }
};
