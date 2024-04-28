import { combineReducers } from "redux";
import listReducer from "../reducers/reducers";
export default combineReducers({
   lists: listReducer
});