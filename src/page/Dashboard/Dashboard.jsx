import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import moment from "moment";

import Swal from "sweetalert2";

import axios from "../../API/api";
import style from "./style.module.css";

import Sidebar from "../../component/Sidebar/Sidebar";
import OverviewCard from "../../component/OverviewCard/OverviewCard";
import Table from "../../component/Table/Table";
import BackdropLoading from "../../component/BackdropLoading/BackdropLoading";

import pasien_icon from "../../assets/img/pasien_icon.svg";
import dokter_icon from "../../assets/img/dokter_icon.svg";
import pertemuan_icon from "../../assets/img/pertemuan_icon.svg";

const Dashboard = () => {

  const navigate = useNavigate()

  const endPoint = "jadwal";
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(false)

  const getJadwal = () => {
    axios.get(endPoint, {
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res) => {
      setLoading(false)
      
      const newData = res.data.data
      const today = moment().format("YYYY-MM-DD")

      newData.forEach((jadwal) => {
        jadwal.namapasien = jadwal.pasien.namapasien
        jadwal.namadokter = jadwal.dokter.namadokter
      })
      
      const todayJadwal = newData.filter((jadwal) => jadwal.tanggal === today)
      
      setJadwal(todayJadwal)
    })
    .catch((err) => {
      setLoading(false)
      console.log(err)
      if(err.response.status === 403){
        Swal.fire({
          icon: 'warning',
          title: 'Oops',
          text: 'Sesi anda sudah berakhir, silahkan login kembali',
        }).then(() => {
          localStorage.removeItem("token")
          navigate("/login")
        })
      }
    });
  }

  useEffect(() => {
    const status = localStorage.getItem("token")
  
    if(status === null){
      navigate("/login", {replace: true})
    }
    else{
      setLoading(true)
      getJadwal()
    }
  }, []);

  const column = [
    { field: "tanggal", header: "Tanggal" },
    { field: "nourut", header: "Antrian" },
    { field: "namapasien", header: "Nama Pasien" },
    { field: "namadokter", header: "Nama Dokter" },
    { field: "jp", header: "Jenis Perawatan" },
  ];

  return (
    <div>
      {loading && (<BackdropLoading/>)}
      <Sidebar />
      <div className={style.container}>
        <div className={style.overview_container}>
          <p className={style.header}>Overview</p>
          <div className={style.overview}>
            <OverviewCard amount={478} type={"Pasien"} icon={pasien_icon} />
            <OverviewCard amount={272} type={"Dokter"} icon={dokter_icon} />
            <OverviewCard amount={78} type={"Pertemuan hari ini"} icon={pertemuan_icon}/>
          </div>
        </div>

        <div className={style.table_container}>
          <p className={style.header}>Jadwal Pasien Hari Ini</p>
          <Link to={"/kelola-jadwal"}>Lihat Selengkapnya</Link>
          <Table
            column={column}
            data={jadwal.slice(0,8)}
            aksi={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
