import { INCREMENT, NEWS_DATA, PROJECTS_DATA, PROJECT_DATA } from "./actions/types";
const initialState = {
  data: [],
  projects: [],
  project: [],
  news: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        data: action.data,
      };
    default:
      return {
        ...state,
      };
  }
  return state;
};
export const news = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_DATA:
      return {
        ...state,
        news: action.news,
      };
    default:
      return {
        ...state,
      };
  }
  return state;
};
export const projects = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_DATA:
      return {
        ...state,
        projects: action.projects,
      };
    case PROJECT_DATA:
      return {
        ...state,
        project: action.project,
      };
    default:
      return {
        ...state,
      };
  }
  return state;
};
