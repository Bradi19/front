import { combineReducers } from "redux";
import { reducer, projects, news ,takeIps} from '../store'

export const rootReducer = combineReducers({
    like: reducer,
})