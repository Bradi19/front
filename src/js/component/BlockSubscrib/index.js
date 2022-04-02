import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

const Blocksubscribe = (props) => {
  const { t,i18n } = useTranslation();
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmitSend = (e, form) => {
    e.preventDefault();
    let email = e.target[0].value;
    if (email.indexOf(".") === -1) {
      setIsErrorEmail(true);
      setErrorMessage(t("forms.formPlan.errorEmail"));
      return;
    }
    if (!isErrorEmail) {
      setErrorMessage();
      let data = new FormData(e.target);
      data.append("_token", "");
      data.append("token", token);
      data.append("subscribed", true);
      data.append("lang", i18n.language);
      data.append("email", document.querySelector('input[name="email"]').value);
      data = props.send(data);
      return;
    }
  };
  return (
    <>
      <section className="newslatter-section">
        <div className="container">
          <div className="newslatter-inner set-bg">
            <div className="ni-text">
              <h3>{t("subscribe.title")}</h3>
              <p>{t("subscribe.description")}</p>
            </div>
            <form onSubmit={(e) => onSubmitSend(e, this)} className="ni-form">
              <input type="email" name="email" placeholder={t("subscribe.youemail")} />
              <GoogleReCaptchaProvider
                reCaptchaKey="6LdZ5cceAAAAANlRyAE5m-6KQ6rfdmZqBGIqei2t"
                scriptProps={{
                  async: true, // optional, default to false,
                  defer: true, // optional, default to false
                  appendTo: "body", // optional, default to "head", can be "head" or "body",
                  nonce: undefined, // optional, default undefined
                }}
              >
                <GoogleReCaptcha onVerify={(t) => setToken(t)} />
              </GoogleReCaptchaProvider>
              <button type="submit">{t("subscribe.button")}</button>
            </form>
          </div>
        </div>
      </section>
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title">
                <h2>{t("subscribe.location.title")}</h2>
                <p>{t("subscribe.location.description")}</p>
              </div>
              <div className="cs-text">
                <div className="ct-address">
                  <span>{t("subscribe.location.addresTitle")}</span>
                  <p>{t("subscribe.location.adress")}</p>
                </div>
                <ul>
                  <li>
                    <span>{t("subscribe.location.phoneTitle")}</span>
                    {t("subscribe.location.phone")}
                  </li>
                  <li>
                    <span>{t("subscribe.location.emailTitle")}</span>
                    {t("subscribe.location.email")}
                  </li>
                </ul>
                <div className="ct-links">
                  <span>{t("subscribe.location.websiteTitle")}</span>
                  {t("subscribe.location.website")}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cs-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52901.38789495531!2d-118.19465514866786!3d34.03523211493029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2cf71ad83ff9f%3A0x518b28657f4543b7!2sEast%20Los%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1579763856144!5m2!1sen!2sbd"
                  height="400"
                  style={{ border: 0 }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Blocksubscribe;
