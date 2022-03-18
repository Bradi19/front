import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { dayData, worksheet } from "./dataNext";

const BlockNext = (props) => {
  const { t } = useTranslation();
  const [isOpenTab, setIsOpenTab] = useState();
  const onClickTab = (e) => {
    let all = document.querySelectorAll(".nav-link"),
      allChild = document.querySelectorAll(".tab-pane"),
      href,
      data = e.target.dataset.id;
    href = e.target.dataset.id;

    if (href === undefined) {
      href = e.target.parentNode.dataset.id;
    }

    all.forEach((item) => {
      item.classList.remove("active");
    });
    allChild.forEach((items) => {
      let id = items.dataset.id;

      if (href.indexOf(id) !== -1) {
        items.classList.add("active");
        return;
      }
      items.classList.remove("active");
    });
    if (data === undefined) {
      e.target.parentNode.classList.add("active");
    }
    e.target.classList.add("active");
  };
  return (
    <section className="schedule-section spad" id="shedule">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>{t('worksheet.title')}</h2>
              <p>{t('worksheet.description')}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="schedule-tab">
              <ul className="nav nav-tabs" role="tablist">
                {dayData.map((e, ia) => {
                  return (
                    <li
                      key={ia}
                      className="nav-item"
                      onClick={(e) => onClickTab(e)}
                    >
                      <a
                        className={e.active ? "nav-link active" : "nav-link"}
                        data-toggle="tab"
                        href={"#tabs-" + (ia + 1)}
                        data-id={"#tabs-" + (ia + 1)}
                        role="tab"
                      >
                        <h5>{t(e.day)}</h5>
                        <p>{t(e.time.a1) + " " + e.time.a2}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="tab-content">
                {worksheet.map((d, i) => {
                  return (
                    <div
                      key={i}
                      className={d.active ? "tab-pane active" : "tab-pane"}
                      id={"tabs-" + (i + 1)}
                      data-id={"tabs-" + (i + 1)}
                      role="tabpanel"
                    >
                      {d.tab.map((item, it) => {
                        return (
                          <div key={it} className="st-content">
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-3">
                                  <div className="sc-pic">
                                    <img src={item.photo} alt="" />
                                  </div>
                                </div>
                                <div className="col-lg-5">
                                  <div className="sc-text">
                                    <h4>{t(item.titleL.t1)}</h4>
                                    <ul>
                                      <li>{t(item.titleL.t2)}</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <ul className="sc-widget">
                                    <li>{t(item.titleR.t1)}</li>
                                    <li>{t(item.titleR.t2)}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BlockNext;
