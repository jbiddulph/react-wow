import {createStore, combineReducers} from "redux";
import reportsReducer from '../reducers/reportsReducer';
import authReducer from "../reducers/authReducer";

const store = createStore(combineReducers({
    reports: reportsReducer,
    auth: authReducer
}))

export default store
