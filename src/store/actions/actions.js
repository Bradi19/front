import { INCREMENT, DECREMENT, PROJECTS_DATA, PROJECT_DATA, SUCCESS_DATA, NEWS_DATA,SUCCESS_USERINFO } from "./types";
import { API } from "../../config/config";
import axios from "axios";
var SHA256 = require("crypto-js/sha256");

export const loads = () => {
  let persons;
  return async (dispatch) => {
    await axios
      .get(API + "/banner", {
        headers: {
          "X-HASH": SHA256("portfolio.ua"),
        },
      })
      .then((res) => {
        persons = res.data;
      });
    dispatch({
      type: INCREMENT,
      data: persons,
    });
  };
};

export const projects = () => {
  let projects;
  return async (dispatch) => {
    await axios
      .get(API + "/projects", {
        headers: {
          "X-HASH": SHA256("portfolio.ua"),
        },
      })
      .then((res) => {
        projects = res.data;
      });
    dispatch({
      type: PROJECTS_DATA,
      projects: projects,
    });
  };
};
export const news = () => {
  let news;
  return async (dispatch) => {
    await axios
      .get(API + "/news", {
        headers: {
          "X-HASH": SHA256("portfolio.ua"),
        },
      })
      .then((res) => {
        news = res.data;
      });
    dispatch({
      type: NEWS_DATA,
      news: news,
    });
  };
};
export const projectOne = (id) => {
  let project;
  return async (dispatch) => {
    await axios
      .post(
        API + "/projectOne",
        { id: id },
        {
          headers: {
            "X-HASH": SHA256("portfolio.ua"),
          },
        }
      )
      .then((res) => {
        project = res.data;
      });
    return dispatch({
      type: PROJECT_DATA,
      project: project,
    });
  };
};
export const sendForm = (data) => {
  let status;
  return async (dispatch) => {
    await axios
      .post(
        API + "/forms",
        data,
        {
          headers: {
            "X-HASH": SHA256("portfolio.ua"),
          },
        }
      )
      .then((res) => {
        status = res.data;
      });
    return dispatch({
      type: SUCCESS_DATA,
      status: status,
    });
  };
};
export const takeIp = () => {
  let user;
  return async (dispatch) => {
    await axios
      .get("https://ipapi.co/json/")
      .then((res) => {
        user = res.data
      });
        dispatch({
          type: SUCCESS_USERINFO,
          infoUser: user,
        });
  };
}