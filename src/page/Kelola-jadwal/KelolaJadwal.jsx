import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"

import Swal from "sweetalert2";

import moment from "moment";

import axios from "../../API/api";

import style from "./style.module.css"

import Sidebar from "../../component/Sidebar/Sidebar"
import Table from "../../component/Table/Table"
import ButtonPrimary from "../../component/button-primary/ButtonPrimary"
import Searchbar from "../../component/Searchbar/Searchbar";

const KelolaJadwal = () => {

    const navigate = useNavigate()

    const endPoint = "jadwal";
    const [jadwal, setJadwal] = useState([]);

    useEffect(() => {
      const status = localStorage.getItem("token")
  
      if(status === null){
        navigate("/login", {replace: true})
      }
      else{
        getJadwal()
      }
    }, []);

    const getJadwal = () => {
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
      }).catch((err) => {
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

    const column = [
      { field: "tanggal", header: "Tanggal" },
      { field: "nourut", header: "Antrian" },
      { field: "namapasien", header: "Nama Pasien" },
      { field: "namadokter", header: "Nama Dokter" },
      { field: "jp", header: "Jenis Perawatan" },
    ];
    
    // Searchbar
	const [query, setQuery] = useState('');
	const [keys, setKey] = useState('all');

	const search = (data) => {
    let queryLowerCase = query.toLowerCase()

		if (keys === 'all') {
			return data.filter(
				(x) =>
					x.namapasien.toLowerCase().includes(queryLowerCase) ||
          x.namadokter.toLowerCase().includes(queryLowerCase) ||
					x.jp.toLowerCase().includes(queryLowerCase)
			);
		} else if (keys === 'namapasien') {
			return data.filter((x) => x.namapasien.toLowerCase().includes(queryLowerCase));
		} else if (keys === 'namadokter') {
			return data.filter((x) => x.namadokter.toLowerCase().includes(queryLowerCase));
		} else if (keys === 'jp') {
			return data.filter((x) => x.jp.toLowerCase().includes(queryLowerCase));
		}
	};

	const dataOption = [
		{ value: 'all', label: 'Semua Kategori' },
		{ value: 'namapasien', label: 'Nama Pasien' },
    { value: 'namadokter', label: 'Nama Dokter' },
		{ value: 'jp', label: 'Jenis Perawatan'},
	];

    return(
        <div>
            <Sidebar/>
            <div className={style.container}>
                <div className={style.button}>
                    <Searchbar
                      dataOption={dataOption}
                      onChangeQuery={(e) => setQuery(e.target.value)}
                      onChangeSelect={(e) => setKey(e.target.value)}
                      placeholder={'Cari jadwal'}
                    />
                    <ButtonPrimary
                        title={"Tambah Jadwal"}
                        onClick={() => {
                        navigate("/tambah-jadwal");
                        }}
                    />
                </div>

                <Table
                    column={column}
                    data={search(jadwal)}
                    aksi={[]}
                />
            </div>
        </div>
    )
}

export default KelolaJadwal