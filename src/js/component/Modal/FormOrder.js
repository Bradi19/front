import { t } from "i18next";
import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import i18n from "../../../i18nextConf";

const FormOrder = (props) => {
    const [minRange, setMinRange] = useState(100);
    const [maxRange, setMaxRange] = useState(300);
    const [isErrorLink, setIsErrorLink] = useState(false);
    const [isErrorRange, setIsErrorRange] = useState(false);
    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [isErrorName, setIsErrorName] = useState(false);
    const [token, setToken] = useState();
    const [isErrorCheckbox, setIsErrorCheckbox] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const rangePrice = useRef();
    const rangeMax = useRef();
    const divStyle = {
      color: "#ee8425",
    };
    const { executeRecaptcha } = useGoogleReCaptcha();
  
    
  const handleSubmit = async (data) => {
    try {
      const newToken = executeRecaptcha("MS_Pyme_DatosEmpresa");
    } catch (err) {
      throw new Error("Token error");
    }
  };

  const changeRange = () => {
    let value = rangePrice.current.value;

    setMinRange(value);
    rangeMax.current.min = parseInt(value) + 200;
    rangeMax.current.max = parseInt(value) + parseInt(value);
    setMaxRange(rangeMax.current.min);
  };
  const onInputChangePrice = () => {
    setMaxRange(Math.ceil(parseInt(rangeMax.current.value)));
  };
  const onChangeLink = (link) => {
    let value = link.target.value;
    setIsErrorLink(false);
    setErrorMessage();
    if (value.length > 2 && value.slice(0, 1).indexOf("h") === -1) {
      setIsErrorLink(true);
      setErrorMessage(t("forms.formPlan.errorLink"));
      return;
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    let value = e.target[2].value,
      email = e.target[1].value;
    if (value.indexOf("http") === -1) {
      setIsErrorLink(true);
      setErrorMessage(t("forms.formPlan.errorLink"));
      return;
    }
    if (email.indexOf(".") === -1) {
      setIsErrorEmail(true);
      setErrorMessage(t("forms.formPlan.errorEmail"));
      return;
    }
    if (props.active &&
      !isErrorLink &&
      !isErrorRange &&
      !isErrorEmail &&
      !isErrorName &&
      !isErrorCheckbox
    ) {
      setErrorMessage();
      let data = new FormData(e.target);
      data.append("_token", "");
      data.append("token", token);
      data.append("lang", i18n.language);
      data = props.send(data);
      return;
    }
  };
  return (
    <>
      <form className="row g-3 needs-validation" onSubmit={(e) => onSubmit(e)}>
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">
            {t("forms.formPlan.first_name")}
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            defaultValue=""
            name="fist_name"
            required
          />
          <div
            className={isErrorName ? "invalid text-danger" : "invalid-feedback"}
          >
            {errorMessage}
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustomUsername" className="form-label">
            {t("forms.formPlan.email")}
          </label>
          <div className="input-group">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              type="email"
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              name="email"
              required
            />
            <div
              className={
                isErrorEmail ? "invalid text-danger" : "invalid-feedback"
              }
            >
              {errorMessage}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom03" className="form-label">
            {t("forms.formPlan.link")}
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            name="link"
            onChange={(link) => onChangeLink(link)}
          />
          <div
            className={isErrorLink ? "invalid text-danger" : "invalid-feedback"}
          >
            {errorMessage}
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom04" className="form-label">
            {t("forms.formPlan.name_project")}
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom04"
            name="name_project"
          />
        </div>
        <label htmlFor="validationCustom05" className="form-label">
          {t("forms.formPlan.price")}
        </label>
        <div className="col-md-6">
          <br />
          USD <br />
          {t("forms.formPlan.min")} <span style={divStyle}>{minRange}</span>{" "}
          <span>$</span> <hr />
          <input
            type="range"
            ref={rangePrice}
            multiple
            className="form-range"
            min="100"
            max="10000"
            step="100"
            name="MinRage"
            id="rangeMin"
            required
            value={minRange}
            onChange={() => changeRange()}
          />
          <div
            className={
              isErrorRange ? "invalid text-danger" : "invalid-feedback"
            }
          >
            {errorMessage}
          </div>
        </div>
        <div className="col-md-6">
          <br />
          USD <br />
          {t("forms.formPlan.max")} <span style={divStyle}>{maxRange}</span>{" "}
          <span>$</span> <hr />
          <input
            type="range"
            ref={rangeMax}
            name="MaxRage"
            className="form-range"
            min="300"
            max="10000"
            step="100"
            id="rangeMax"
            required
            value={maxRange}
            onChange={() => onInputChangePrice()}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="invalidCheck"
              required
            />
            <label className="form-check-label" htmlFor="invalidCheck">
              {t("forms.formPlan.agree")}
            </label>
            <div
              className={
                isErrorCheckbox ? "invalid text-danger" : "invalid-feedback"
              }
            >
              {errorMessage}
            </div>
          </div>
        </div>

        <GoogleReCaptcha onVerify={(t) => setToken(t)} />

        <div className="col-12">
          <button className="btn btn-styleStk" type="submit">
            {t("forms.formPlan.submit")}
          </button>
        </div>
      </form>
    </>
  );
};
export default FormOrder;
