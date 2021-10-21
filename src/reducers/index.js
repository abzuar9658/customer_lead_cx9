import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { companiesReducer } from "./companiesReducer";
import { leadsReducer, leadsReducerCompany } from "./leadsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    leads: leadsReducer,
    companies: companiesReducer,
    leadsCompany: leadsReducerCompany,
});

export default rootReducer;