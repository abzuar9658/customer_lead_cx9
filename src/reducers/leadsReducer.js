import * as actionTypes from "../actions/types";
const initial_state = {
    data: [],
    isLoading: null,
    isSuccess: null,
    isError: null,
    errorMessage: null,
};

export const leadsReducer = (state = initial_state, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.LEADS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.LEADS_LOAD_SUCCESS:
            return {
                ...state,
                data: payload.data.data,
                isSuccess: true,
                isLoading: false,
                isError: false,
            };
        case actionTypes.LEADS_LOAD_FAIL:
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
        case actionTypes.LEADS_CLEAR:
            return {
                ...state,
                data: [],
                isLoading: null,
                isSuccess: null,
                isError: null,
                errorMessage: null,
            };
        default:
            return state;
    }
};

const initial_state_company = {
    data: [],
};
export const leadsReducerCompany = (state = initial_state_company, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.LEADS_LOADING_COMPANY:
            return {
                ...state,
            };
        case actionTypes.LEADS_LOAD_COMPANY_SUCCESS:
            return {
                ...state,
                data: payload.data.data,
            };
        case actionTypes.LEADS_LOAD_COMPANY_FAIL:
            return {
                ...state,
                data: null,
            };
        default:
            return state;
    }
};