import { combineReducers } from "redux";
import { reducer, projects } from '../store'

export const rootReducer = combineReducers({
    like: reducer,
    projects: projects
})