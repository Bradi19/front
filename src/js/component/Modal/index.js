import { t } from "i18next";
import React from "react";

import FormOrder from "./FormOrder";
const Modal = (props) => {

  const addForm = () => {
        switch(props.form){
          case 'info':
            break
          default:
            return (<FormOrder send={(data) => props.send(data)}/>)
        }
  }
  return (
    <>
      <div className={props.active ? "modals active" : "modals"}>
        <div className="shadows" onClick={() => props.closer(false)}></div>

        <div className="block">
          <div className="header">
            <div className="title">{t("forms.formPlan.title")}</div>
          </div>
          {props.dataLwo ? (
            <div className="loader"></div>
          ) : (
            addForm()
          )}
        </div>
      </div>
    </>
  );
};
export default Modal;
