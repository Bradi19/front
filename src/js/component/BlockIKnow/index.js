import { t } from "i18next";
import React from "react";

const BlockIKnow = (props) => {
  return (
    <section className="latest-blog spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>{t('news.title')}</h2>
              <p>{t('news.description')}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div
              className="latest-item set-bg large-item"
              data-setbg={props.images.Latestone}
            >
              <div className="li-tag">Marketing</div>
              <div className="li-text">
                <h4>
                  <a href="./blog-details.html">
                    Improve You Business Cards And Enchan Your Sales
                  </a>
                </h4>
                <span>
                  <i className="fa fa-clock-o"></i> 19th May, 2019
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="latest-item set-bg" data-setbg={props.images.Latesttwo}>
              <div className="li-tag">Experience</div>
              <div className="li-text">
                <h5>
                  <a href="./blog-details.html">
                    All users on MySpace will know that there are millions of
                    people out there.
                  </a>
                </h5>
                <span>
                  <i className="fa fa-clock-o"></i> 19th May, 2019
                </span>
              </div>
            </div>
            <div className="latest-item set-bg" data-setbg={props.images.Latesttree}>
              <div className="li-tag">Marketing</div>
              <div className="li-text">
                <h5>
                  <a href="./blog-details.html">
                    A Pocket PC is a handheld computer, which features many of
                    the same capabilities.
                  </a>
                </h5>
                <span>
                  <i className="fa fa-clock-o"></i> 19th May, 2019
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BlockIKnow;
