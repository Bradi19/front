import { t } from "i18next";
import React from "react";
import { URL } from "../../../config/config";
const BlockIKnow = (props) => {
  return (
    <section className="latest-blog spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>{t("news.title")}</h2>
              <p>{t("news.description")}</p>
            </div>
          </div>
        </div>
        {typeof(props.data[2]) !== 'undefined' ? (
          <div className="row">
            <div className="col-lg-6">
              <div
                className="latest-item set-bg large-item"
                data-setbg={props.images.Latestone}
              >
                <img
                  src={URL + JSON.parse(props.data[0].paramsBanner).public_url}
                />
                <div className="li-tag">{props.data[0].datePublish}</div>
                <div className="li-text">
                  <h4>
                    <a href="#">{props.data[0].title}</a>
                  </h4>
                  <span>
                    <i className="fa fa-clock-o"></i>{" "}
                    {props.data[0].datePublish}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="latest-item set-bg"
                data-setbg={props.images.Latesttwo}
              >
                <img
                  src={URL + JSON.parse(props.data[1].paramsBanner).public_url}
                />
                <div className="li-tag">{props.data[1].datePublish}</div>
                <div className="li-text">
                  <h5>
                    <a href="./blog-details.html">{props.data[1].title}</a>
                  </h5>
                  <span>
                    <i className="fa fa-clock-o"></i>{" "}
                    {props.data[1].datePublish}
                  </span>
                </div>
              </div>
              <div
                className="latest-item set-bg"
                data-setbg={props.images.Latesttree}
              >
                <img
                  src={URL + JSON.parse(props.data[2].paramsBanner).public_url}
                />
                <div className="li-tag">{props.data[2].datePublish}</div>
                <div className="li-text">
                  <h5>
                    <a href="./blog-details.html">{props.data[2].title}</a>
                  </h5>
                  <span>
                    <i className="fa fa-clock-o"></i>{" "}
                    {props.data[2].datePublish}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};
export default BlockIKnow;
