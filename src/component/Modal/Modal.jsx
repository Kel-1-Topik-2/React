import React from "react";
import style from "./style.module.css";

function Modal({ handleDeleteTrue, handleCancel, title, text }) {
  return (
    <div className={style.popup}>
      <div className={style.innerPopup}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className={style.btn}>
          <button onClick={handleCancel}>Batal</button>
          <button onClick={handleDeleteTrue}>Hapus</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
