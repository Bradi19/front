import React, { useState } from "react";
import "../../../scss/header.scss";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Modal from "../Modal";
import { useTranslation } from "react-i18next";
import Logo from "../../../img/logo.png";
import Chat from "../Chat";
const Header = (props) => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(false);
  const [dataLwo, setDataLwo] = useState("");

  const changeShow = (item, activate) => {
    item.preventDefault();
    document.querySelector("html").style.overflow = "hidden";

    setActive(activate);
  };
  const closeModal = (e) => {
    setActive(e);
    document.querySelector("html").style.overflow = "auto";
  };
  const sendMassege = (data) => {
    setDataLwo(true);
    props.pageActions.sendForm(data).then((e) => {
      setDataLwo(e);
      if (e.status.success) {
        setDataLwo(false);
        setActive(false);
        document.querySelector("html").style.overflow = "auto";
      }
    });
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
      <GoogleReCaptchaProvider
        reCaptchaKey="6LdZ5cceAAAAANlRyAE5m-6KQ6rfdmZqBGIqei2t"
        scriptProps={{
          async: true, // optional, default to false,
          defer: true, // optional, default to false
          appendTo: "body", // optional, default to "head", can be "head" or "body",
          nonce: undefined, // optional, default undefined
        }}
      >
        <Modal
          dataLwo={dataLwo}
          active={active}
          closer={(e) => closeModal(e)}
          send={(data) => sendMassege(data)}
          data={dataLwo.status}
        />
      </GoogleReCaptchaProvider>
    </>
  );
};
export default Header;
