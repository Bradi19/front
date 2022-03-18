import {
  INCREMENT,
  NEWS_DATA,
  PROJECTS_DATA,
  PROJECT_DATA,
  SUCCESS_USERINFO,
} from "./actions/types";
const initialState = {
  data: [],
  projects: [],
  project: [],
  news: [],
  infoUser: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        data: action.data,
      };
    case NEWS_DATA:
      return {
        ...state,
        news: action.news,
      };
    case SUCCESS_USERINFO:
      return {
        ...state,
        infoUser: action.infoUser,
      };
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
