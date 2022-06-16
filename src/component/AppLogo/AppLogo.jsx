import React from "react";

import style from "./style.module.css"

import app_icon from "../../assets/img/app_icon.svg";

const AppLogo = () => {
    return(
        <div className={style.container}>
            <img src={app_icon} alt="" />
            <div>
                <span style={{ color: "#358C56" }}>Puskesmas </span>
                <span style={{ color: "#4CA9EE" }}>Malaka</span>
                </div>

                <p>JAWA BARAT</p>
            </div>
    )
}

export default AppLogo