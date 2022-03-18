import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { URL } from "../../../config/config";

const BlockNews = (props) => {
  const { t } = useTranslation();
  const [dataProject, setDataProject] = useState(false);
  const [activeProject, setActiveProject] = useState(false);
  const refModal = useRef();
  const openModal = (e, id=null) => {
    e.preventDefault();
    document.querySelector("html").style.overflow = "hidden";
    if (id && !dataProject || id !== dataProject.id) {
      props.projectOne(id).then((e) => {
        setDataProject(e.project);
        setActiveProject(true);
      });
    } else {
      setActiveProject(true);
    }

    if (!dataProject) {
      setActiveProject(false);
    }
  };
  const closeModal = () => {
    document.querySelector("html").style.overflow = "auto";

    setActiveProject(false);
  };
  return (
    <>
      {activeProject ? (
        <div className={activeProject ? "ModelProject active" : "ModelProject"}>
          <div className="blocks">
            <div className="close" onClick={() => closeModal()}>
              X
            </div>
            <div className="imagesblock">
              <div>
                <img
                  src={URL + JSON.parse(dataProject.paramsBanner).public_url}
                />
                <div className="shadow"></div>
              </div>
              <div className="title">{dataProject.title}</div>
            </div>
            <div
              className="desccription"
              dangerouslySetInnerHTML={{ __html: dataProject.body }}
            ></div>
          </div>
        </div>
      ) : (
        ""
      )}
      <section className="home-about-section spad" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="ha-pic">
                <img src={props.images.HAbout} alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ha-text">
                <h2>{t("about.block1.title")}</h2>
                <p>{t("about.block1.description")}</p>
                <ul>
                  <li>
                    <span className="icon_check"></span>
                    {t("about.block1.first")}
                  </li>
                  <li>
                    <span className="icon_check"></span>
                    {t("about.block1.second")}
                  </li>
                  <li>
                    <span className="icon_check"></span>
                    {t("about.block1.three")}
                  </li>
                  <li>
                    <span className="icon_check"></span>
                    {t("about.block1.four")}
                  </li>
                </ul>
                <a href="#" className="ha-btn">
                  {t("about.block1.button")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="team-member-section" id="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>{t("project.title")}</h2>
                <p>{t("project.description")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="memeber-List">
          {props.projects.map((e, ie) => {
            return (
              <div
                key={ie}
                className="member-item set-bg"
                data-setbg={props.images.Member}
              >
                <a
                  data-id={e.id}
                  onClick={(ol) => openModal(ol, e.id)}
                  href="#"
                >
                  <div className="mi-social">
                    <div className="mi-social-inner bg-gradient">
                      <img src={URL + JSON.parse(e.paramsBanner).public_url} />
                    </div>
                  </div>
                  <div className="mi-text">
                    <div className="title">
                      <h5>{e.title}</h5>
                    </div>
                    <div className="description">
                      <button className="btn btn-read">
                        {t("buttons.readbtn")}
                      </button>
                    </div>
                  </div>
                </a>
                <div className="hoverThis">{t("buttons.hoverbtn")}</div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default BlockNews;
