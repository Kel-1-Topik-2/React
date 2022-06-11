import React, { useState, useEffect } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import axios from "../../dummy-api/api";
import Table from "../../component/Table/Table";
import style from "./style.module.css";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import { useNavigate } from "react-router-dom";

const DataPasien = () => {
  const endPoint = "Pasien";
  const [dataPasien, setDataPasien] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(endPoint).then((res) => {
      setDataPasien(res.data);
    });
  }, []);

  const handleDelete = (idPasien) => {
    const answer = window.confirm("Anda yakin untuk menghapus data?");

    if (answer) {
      axios
        .delete(endPoint + `/${idPasien}`)
        .then((res) => {
          alert("Data berhasil dihapus!");
          navigate(0);
        })
        .catch((err) => console.log(err));
    }
  };

  const detailClick = (idPasien) => {
    navigate(`/detail-data-pasien/${idPasien}`);
  };

  const column = [
    { field: "idPasien", header: "ID" },
    { field: "nama", header: "Nama Lengkap" },
    { field: "nik", header: "NIK" },
    { field: "usia", header: "Usia" },
  ];

  return (
    <div>
      <Sidebar />
      <div className={style.container}>
        <div className={style.button}>
          <ButtonPrimary
            title={"Tambah Data"}
            onClick={() => {
              navigate("/add-data-pasien");
            }}
          />
        </div>
        <Table
          column={column}
          data={dataPasien}
          primaryKey={"idPasien"}
          onDelete={handleDelete}
          detailClick={detailClick}
        />
      </div>
    </div>
  );
};

export default DataPasien;
