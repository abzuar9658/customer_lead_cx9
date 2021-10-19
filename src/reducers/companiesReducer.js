import * as actionTypes from "../actions/types";
const initial_state = {
    data: [],
    isLoading: null,
    isSuccess: null,
    isError: null,
    errorMessage: null,
};

export const companiesReducer = (state = initial_state, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.COMPANIES_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.COMPANIES_LOAD_SUCCESS:
            return {
                ...state,
                data: payload.data,
                isSuccess: true,
                isLoading: false,
                isError: false,
            };
        case actionTypes.COMPANIES_LOAD_FAIL:
            return {
                ...state,
                data: null,
                isSuccess: false,
                isLoading: false,
                isError: true,
                errorMessage: payload,
            };
        case actionTypes.CLEAR_COMPANY_ERROR:
            return {
                ...state,
                isError: false,
                errorMessage: null,
            };
        default:
            return state;
    }
};