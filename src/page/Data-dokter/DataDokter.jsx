import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "../../dummy-api/api";

import style from "./style.module.css";

import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import Sidebar from "../../component/Sidebar/Sidebar";
import Table from "../../component/Table/Table";

const DataDokter = () => {
  const endPoint = "Dokter";
  const [dataDokter, setDataDokter] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(endPoint).then((res) => {
      setDataDokter(res.data);
    });
  }, []);

  const handleDelete = (idDokter) => {
    const answer = window.confirm("Anda yakin untuk menghapus data?");

    if (answer) {
      axios
        .delete(endPoint + `/${idDokter}`)
        .then((res) => {
          alert("Data berhasil dihapus!");
          navigate(0);
        })
        .catch((err) => console.log(err));
    }
  };

  const detailClick = (dataDokter) => {
    navigate(`/detail-data-dokter/${dataDokter}`);
  };

  const column = [
    { field: "npa", header: "NPA IDI" },
    { field: "nama", header: "Nama Lengkap" },
    { field: "userName", header: "Username" },
    { field: "spesialis", header: "Spesialis" },
  ];

  return (
    <div>
      <Sidebar />
      <div className={style.container}>
        <div className={style.button}>
          <ButtonPrimary
            title={"Tambah Data"}
            onClick={() => {
              navigate("/add-data-dokter");
            }}
          />
        </div>
        <Table
          column={column}
          data={dataDokter}
          primaryKey={"idDokter"}
          onDelete={handleDelete}
          detailClick={detailClick}
        />
      </div>
    </div>
  );
};

export default DataDokter;
