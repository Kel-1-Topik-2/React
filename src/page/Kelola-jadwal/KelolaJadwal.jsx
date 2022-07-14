import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"

import moment from "moment";

import axios from "../../API/api";

import style from "./style.module.css"

import Sidebar from "../../component/Sidebar/Sidebar"
import Table from "../../component/Table/Table"
import ButtonPrimary from "../../component/button-primary/ButtonPrimary"

const KelolaJadwal = () => {

    const navigate = useNavigate()

    const endPoint = "jadwal";
    const [jadwal, setJadwal] = useState([]);

    useEffect(() => {
        axios.get(endPoint, {
          headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }).then((res) => {
          const newData = res.data
          const today = moment().format("YYYY-MM-DD")
    
          newData.forEach((jadwal) => {
            jadwal.namapasien = jadwal.pasien.namapasien
            jadwal.namadokter = jadwal.dokter.namadokter
          })
          
          const todayJadwal = newData.filter((jadwal) => jadwal.tanggal === today)
          
          setJadwal(todayJadwal)
        });
      }, []);

      const column = [
        { field: "tanggal", header: "Tanggal" },
        { field: "nourut", header: "Antrian" },
        { field: "namapasien", header: "Nama Pasien" },
        { field: "namadokter", header: "Nama Dokter" },
        { field: "jp", header: "Jenis Perawatan" },
      ];
    
    return(
        <div>
            <Sidebar/>
            <div className={style.container}>
                <div className={style.button}>
                    <ButtonPrimary
                        title={"Tambah Jadwal"}
                        onClick={() => {
                        navigate("/tambah-jadwal");
                        }}
                    />
                </div>

                <Table
                    column={column}
                    data={jadwal}
                    aksi={[]}
                />
            </div>
        </div>
    )
}

export default KelolaJadwal