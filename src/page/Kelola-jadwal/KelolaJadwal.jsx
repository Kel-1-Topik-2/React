import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"

import axios from "../../dummy-api/api";

import style from "./style.module.css"

import Sidebar from "../../component/Sidebar/Sidebar"
import Table from "../../component/Table/Table"
import ButtonPrimary from "../../component/button-primary/ButtonPrimary"

const KelolaJadwal = () => {

    const navigate = useNavigate()

    const endPoint = "Jadwal";
    const [jadwal, setJadwal] = useState([]);

    useEffect(() => {
        axios.get(endPoint).then((res) => {
          setJadwal(res.data);
        });
      }, []);

      const column = [
        { field: "tanggal", header: "Tanggal" },
        { field: "noUrut", header: "Antrian" },
        { field: "namaPasien", header: "Nama Pasien" },
        { field: "namaDokter", header: "Nama Dokter" },
        { field: "jenisPerawatan", header: "Jenis Perawatan" },
      ];
    
    return(
        <div>
            <Sidebar/>
            <div className={style.container}>
                <div className={style.button}>
                    <ButtonPrimary
                        title={"Tambah Jadwal"}
                        onClick={() => {
                        navigate("");
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