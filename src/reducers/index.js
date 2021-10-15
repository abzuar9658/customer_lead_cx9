import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { companiesReducer } from "./companiesReducer";
import { leadsReducer } from "./leadsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  leads: leadsReducer,
  companies: companiesReducer,
});

export default rootReducer;
