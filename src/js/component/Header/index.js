import React from "react";
import "../../../scss/header.scss";
import { useTranslation } from "react-i18next";
import Logo from "../../../img/logo.png";
const Header = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <header className="header-section">
        <div className="container">
          <div className="logo">
            <a href="./index.html">
              <img src={ Logo } alt="" />
            </a>
          </div>
          <div className="nav-menu">
            <nav className="mainmenu mobile-menu">
              <ul>
                <li className="active">
                  <a href="./index.html">{t("header.menu.home")}</a>
                </li>
                <li>
                  <a href="./about-us.html">{t("header.menu.about")}</a>
                </li>
                <li>
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
                </li>
                <li>
                  <a href="./schedule.html">{t("header.menu.schedule")}</a>
                </li>
                <li>
                  <a href="./blog.html">{t("header.menu.blog")}</a>
                </li>
                <li>
                  <a href="./contact.html">{t("header.menu.contacts")}</a>
                </li>
              </ul>
            </nav>
            <a href="#" className="primary-btn top-btn">
              <i className="fa fa-ticket"></i> Ticket
            </a>
          </div>
          <div id="mobile-menu-wrap"></div>
        </div>
      </header>
    </>
  );
};
export default Header;
