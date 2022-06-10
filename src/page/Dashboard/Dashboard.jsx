import React from "react";
import { useState, useEffect } from "react";
import axios from "../../dummy-api/api";
import style from "./style.module.css";
import Sidebar from "../../component/Sidebar/Sidebar";
import OverviewCard from "../../component/OverviewCard/OverviewCard";
import Table from "../../component/Table/Table";
import pasien_icon from "../../assets/img/pasien_icon.svg";
import dokter_icon from "../../assets/img/dokter_icon.svg";
import suster_icon from "../../assets/img/suster_icon.svg";
import pertemuan_icon from "../../assets/img/pertemuan_icon.svg";

const Dashboard = () => {
  const endPoint = "Pasien";
  const [dataPasien, setDataPasien] = useState([]);

  useEffect(() => {
    axios.get(endPoint).then((res) => {
      setDataPasien(res.data);
    });
  }, [dataPasien]);

  return (
    <div>
      <Sidebar />
      <div className={style.container}>
        <div className={style.overview_container}>
          <p className={style.header}>Overview</p>
          <div className={style.overview}>
            <OverviewCard amount={478} type={"Pasien"} icon={pasien_icon} />
            <OverviewCard amount={272} type={"Dokter"} icon={dokter_icon} />
            <OverviewCard amount={67} type={"Suster"} icon={suster_icon} />
            <OverviewCard
              amount={78}
              type={"Pertemuan hari ini"}
              icon={pertemuan_icon}
            />
          </div>
        </div>

        <p className={style.header}>Data Pasien Terkini</p>
        <Table
          column={["ID", "NAMA LENGKAP", "NIK", "USIA"]}
          data={dataPasien.slice(0, 9)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
