/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../../scss/header.scss";
import { useTranslation } from "react-i18next";
import Logo from "../../../img/logo.png";
const Header = (props) => {
  const { t, i18n } = useTranslation();

  const changeShow = (item, activate) => {
    item.preventDefault();
    document.querySelector("html").style.overflow = "hidden";

    props.setActive(activate);
  };
  return (
    <>
      <header className="header-section">
        <div className="container">
          <div className="logo">
            <a href="./index.html">
              <img src={Logo} alt="" />
            </a>
          </div>
          <div className="nav-menu">
            <nav className="mainmenu mobile-menu">
              <ul>
                <li className="active">
                  <a href="./index.html">{t("header.menu.home")}</a>
                </li>
                <li>
                  <a href="#about">{t("header.menu.about")}</a>
                </li>
                {/* <li>
                  <a href="./speaker.html">{t("header.menu.speakers")}</a>
                  <ul className="dropdown">
                    <li>
                      <a href="#">Jayden</a>
                    </li>
                    <li>
                      <a href="#">Sara</a>
                    </li>
                    <li>
                      <a href="#">Emma</a>
                    </li>
                    <li>
                      <a href="#">Harriet</a>
                    </li>
                  </ul>
                </li> */}
                <li>
                  <a href="#shedule">{t("header.menu.schedule")}</a>
                </li>
                <li>
                  <a href="./blog.html">{t("header.menu.blog")}</a>
                </li>
                <li>
                  <a href="./contact.html">{t("header.menu.contacts")}</a>
                </li>
                <li></li>
              </ul>
            </nav>
            <a
              href="#"
              className="primary-btn top-btn"
              onClick={(e) => changeShow(e, true)}
            >
              <i className="fa fa-ticket"></i> {t("header.menu.button")}
            </a>
          </div>
          <div id="mobile-menu-wrap"></div>
        </div>
      </header>
    </>
  );
};
export default Header;
