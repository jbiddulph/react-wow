import {createStore, combineReducers} from "redux";
import reportsReducer from '../reducers/reportsReducer';

const store = createStore(combineReducers({
    reports: reportsReducer
}))

export default store
