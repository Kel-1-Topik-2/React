import React from "react";

import style from "./style.module.css"

import AppLogo from "../../component/AppLogo/AppLogo"

const TambahJadwal = () => {
    return(
        <div className={style.container}>
            <div className={style.header_container}>
                <div className={style.icon}>
                    <AppLogo/>
                </div>
                <p className={style.header}>Tambah Jadwal</p>
            </div>
        </div>
    )
}

export default TambahJadwal