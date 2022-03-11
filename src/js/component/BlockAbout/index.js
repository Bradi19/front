import React from "react";
import { useTranslation } from "react-i18next";

const BlockAbout = (props) => {
    const { t } = useTranslation();
  return (
    <section
      className="pricing-section set-bg spad"
      data-setbg={props.images.Pricing}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>{t("cards.title")}</h2>
              <p>{t("cards.description")}</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-8">
            <div className="price-item">
              <h4>{t("cards.card1.title")}</h4>
              <div className="pi-price">
                <h2>
                  <span>UAH</span>
                  {t("cards.card1.price") }
                  
                </h2>
              </div>
              <ul><li>{t("cards.card1.description")}</li></ul>
              <a href="#" className="price-btn" onClick={(e) => props.active(e,true)}>
                {t("cards.card1.button")} <span className="arrow_right"></span>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-8">
            <div className="price-item top-rated">
              <div className="tr-tag">
                <i className="fa fa-star"></i>
              </div>
              <h4>{t("cards.card2.title")}</h4>
              <div className="pi-price">
                <h2>
                  <span>UAH</span>
                  {t("cards.card2.price")}
                </h2>
              </div>
              <ul><li>{t("cards.card2.description")}</li></ul>
              <a href="#" className="price-btn" onClick={(e) => props.active(e,true)}>
                {t("cards.card2.button")} <span className="arrow_right"></span>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-8">
            <div className="price-item">
              <h4>{t("cards.card3.title")}</h4>
              <div className="pi-price">
                <h2>
                  <span>UAH</span>
                  {t("cards.card3.price")}
                </h2>
              </div>
              <ul><li>{t("cards.card3.description")}</li></ul>
              <a href="#" className="price-btn" onClick={(e) => props.active(e,true)}>
                {t("cards.card3.button")}
                <span className="arrow_right"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BlockAbout;
