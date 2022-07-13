import React from "react";

import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import style from "./style.module.css";

import AppLogo from "../AppLogo/AppLogo";

import Modal from "../ModalNew/Modal";

import dashboard_icon from "../../assets/img/dashboard_icon.svg";
import data_pasien_icon from "../../assets/img/data_pasien_icon.svg";
import data_dokter_icon from "../../assets/img/data_dokter_icon.svg";
import kelola_jadwal_icon from "../../assets/img/kelola_jadwal_icon.svg";
import arsip_jadwal_icon from "../../assets/img/arsip_jadwal_icon.svg";
import logout_icon from "../../assets/img/logout_icon.svg";

const Sidebar = () => {

  const navigate = useNavigate()

  const [popup, setPopup] = useState({ show: false });

  const logoutClick = () => {
    setPopup({
      show: true,
    });
  }

  return (
    <div className={style.container}>
      <div className={style.icon}>
        <AppLogo/>
      </div>
      <div className={style.navigation_container}>
        <ul>
          <NavLink to="/"
            style={({isActive}) => (
              isActive ? {
                filter: "invert(43%) sepia(49%) saturate(487%) hue-rotate(90deg) brightness(95%) contrast(92%)"
              } : {}
            )}>
            <img src={dashboard_icon} alt="" />
            <li>Dashboard</li>
          </NavLink>

          <NavLink to="/data-pasien"
            style={({isActive}) => (
              isActive ? {
                filter: "invert(43%) sepia(49%) saturate(487%) hue-rotate(90deg) brightness(95%) contrast(92%)"
              } : {}
            )}>
            <img src={data_pasien_icon} alt="" />
            <li>Data Pasien</li>
          </NavLink>

          <NavLink to="/data-dokter"
            style={({isActive}) => (
              isActive ? {
                filter: "invert(43%) sepia(49%) saturate(487%) hue-rotate(90deg) brightness(95%) contrast(92%)"
              } : {}
            )}>
            <img src={data_dokter_icon} alt="" />
            <li>Data Dokter</li>
          </NavLink>

          <NavLink to="/kelola-jadwal"
            style={({isActive}) => (
              isActive ? {
                filter: "invert(43%) sepia(49%) saturate(487%) hue-rotate(90deg) brightness(95%) contrast(92%)"
              } : {}
            )}>
            <img src={kelola_jadwal_icon} alt="" />
            <li>Kelola Jadwal</li>
          </NavLink>

          <NavLink to="/arsip-jadwal"
            style={({isActive}) => (
              isActive ? {
                filter: "invert(43%) sepia(49%) saturate(487%) hue-rotate(90deg) brightness(95%) contrast(92%)"
              } : {}
            )}>
            <img src={arsip_jadwal_icon} alt="" />
            <li>Arsip Jadwal</li>
          </NavLink>

          <hr />

          <NavLink to={"#"} onClick={() => logoutClick()}>
            <img src={logout_icon} alt="" />
            <li>Logout</li>
          </NavLink>
        </ul>
      </div>

      {popup.show && (
          <Modal
            title={"Berhasil logout"}
            handleCancel={() => {
              sessionStorage.removeItem("token")
              navigate("/login")
            }}
          />
        )}

    </div>
  );
};

export default Sidebar;
