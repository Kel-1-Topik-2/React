import React from "react";
import style from "./style.module.css";

function Modal({ handleCancel, title }) {
  return (
    <div className={style.popup}>
      <div className={style.innerPopup}>
        <h3>{title}</h3>
        <div className={style.btn}>
          <button className={style.btnCancel} onClick={handleCancel}>
            <strong>OK</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
