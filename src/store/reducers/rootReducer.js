import { combineReducers } from "redux";
import { reducer, projects, news } from '../store'

export const rootReducer = combineReducers({
    like: reducer,
    projects: projects,
    news: news,
})