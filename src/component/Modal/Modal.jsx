import React from "react";
import style from "./style.module.css";

function Modal({ handleDeleteTrue, handleCancel, title, text }) {
  return (
    <div className={style.popup}>
      <div className={style.innerPopup}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className={style.btn}>
          <button className={style.btnCancel} onClick={handleCancel}>
            <strong>BATAL</strong>
          </button>
          <button className={style.btnTrue} onClick={handleDeleteTrue}>
            <strong>HAPUS</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
