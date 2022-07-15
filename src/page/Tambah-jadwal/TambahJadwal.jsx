import React from "react";

import { useState,useEffect } from "react";

import axios from "../../API/api";

import { useNavigate } from "react-router";

import moment from "moment";

import Swal from "sweetalert2";

import style from "./style.module.css"

import AppLogo from "../../component/AppLogo/AppLogo"
import StepCard from "../../component/StepCard/StepCard";
import Table from "../../component/Table/Table";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary"
import ButtonKembali from "../../component/button-kembali/ButtonKembali";
import Searchbar from "../../component/Searchbar/Searchbar";
import BackdropLoading from "../../component/BackdropLoading/BackdropLoading";

import pasien_icon from "../../assets/img/pasien_icon.svg"
import dokter_icon from "../../assets/img/dokter_icon.svg"
import jadwal_icon from "../../assets/img/pertemuan_icon.svg"
import tambah_icon from "../../assets/img/tambah_icon.svg"

const TambahJadwal = () => {

    const navigate = useNavigate()

    const [step, setStep] = useState("step1")
    const [dataPasien, setDataPasien] = useState([]);
    const [dataDokter, setDataDokter] = useState([]);
    const [selected, setSelected] = useState({
        pasien: {},
        dokter: {},
    })

    const [jadwal, setJadwal] =  useState({
        nourut: 0,
        jp: "",
        tanggal: "",
        dokter_id: 0,
        pasien_id: 0,
    })

    const [loading, setLoading] = useState(false)

    const step_progress = {
        filter: "invert(55%) sepia(86%) saturate(653%) hue-rotate(179deg) brightness(97%) contrast(93%)"
    }

    const getDataPasien = () => {
        const endPoint = "pasien"

        setLoading(true)

        axios.get(endPoint, {
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setDataPasien(res.data);
        }).catch((err) => {
            setLoading(false)
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

    const getDataDokter = () => {
        const endPoint = "dokter"

        axios.get(endPoint, {
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setLoading(false)
            const newData = res.data

            newData.forEach((dokter) => {
                dokter.username = dokter.user.username
            })
            
            setDataDokter(newData)
        }).catch((err) => {
            setLoading(false)
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
    
    const getNoUrut = () => {
        const endPoint = "jadwal"

        setLoading(true)

        axios.get(endPoint, {
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            const pickedDate = res.data.filter((item) => item.tanggal === jadwal.tanggal) 
            
            setJadwal({...jadwal, nourut: pickedDate.length + 1})
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
        })
    }

    useEffect(() => {
        const status = localStorage.getItem("token")
  
		if(status === null){
			navigate("/login", {replace: true})
		}
        else{
            getDataPasien()
            getDataDokter()
        }
    }, [])

    useEffect(() => {
        //only run if no urut in jadwal change, that happens when form is submitted
        if(jadwal.nourut !== 0){
            const endpoint = "jadwal"
            axios.post(endpoint, {...jadwal}, {
                headers: {
                    "content-type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res) => {
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses...',
                    text: 'Data telah berhasil disimpan',
                }).then(() => {
                    navigate("/kelola-jadwal")
                })
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Terjadi kesalahan',
                })
            })    
        }
    }, [jadwal.nourut])

    const handleChangeForm = (e) => {
        const newJadwal = {...jadwal}
        newJadwal[e.target.name] = e.target.value

        setJadwal(newJadwal)
    }

    const column_step1 = [
		{ field: 'id', header: 'ID' },
		{ field: 'namapasien', header: 'Nama Lengkap' },
		{ field: 'nik', header: 'NIK' },
		{ field: 'umur', header: 'Usia' },
	];
    
    const aksi_step1 = [
        {
            click: (id) => {
                const pasien = dataPasien.filter((item) => item.id === id)
                setSelected({...selected, pasien: pasien[0]})

                setJadwal({...jadwal, pasien_id: id})

                setStep("step2")
                
                setKey("all")
                setQuery("")
            },
            icon: tambah_icon
        },
    ]

    const [keys, setKey] = useState('all');
	const [query, setQuery] = useState('');

    // Search pasien
	const searchPasien = (data) => {
        let queryLowerCase = query.toLowerCase()

		if (keys === 'all') {
			return data.filter(
				(x) =>
					x.id
						.toString()
						.toLowerCase()
						.includes(queryLowerCase) ||
					x.namapasien.toLowerCase().includes(queryLowerCase) ||
					x.nik
						.toString()
						.toLowerCase()
						.includes(queryLowerCase)
			);
		} else if (keys === 'id') {
			return data.filter((x) =>
				x.id
					.toString()
					.toLowerCase()
					.includes(queryLowerCase)
			);
		} else if (keys === 'nama') {
			return data.filter((x) => x.namapasien.toLowerCase().includes(queryLowerCase));
		} else if (keys === 'nik') {
			return data.filter((x) =>
				x.nik
					.toString()
					.toLowerCase()
					.includes(queryLowerCase)
			);
		}
		return data;
	};

	const dataPasienOption = [
		{ value: 'all', label: 'Semua Kategori' },
		{ value: 'id', label: 'ID' },
		{ value: 'nama', label: 'Nama Lengkap' },
		{ value: 'nik', label: 'NIK' },
	];

    const column_step2 = [
        { field: "srp", header: "NPA IDI" },
        { field: "namadokter", header: "Nama Lengkap" },
        { field: "username", header: "Username" },
        { field: "spesialis", header: "Spesialis" },
    ];
    
    const aksi_step2 = [
        {
            click: (id) => {
                const dokter = dataDokter.filter((item) => item.id === id)
                setSelected({...selected, dokter: dokter[0]})
                
                setJadwal({...jadwal, dokter_id: id})

                setStep("step3")

                setKey("all")
                setQuery("")
            },
            icon: tambah_icon
        },
    ]

    //Search dokter
    const searchDokter = (data) => {
        let queryLowerCase = query.toLowerCase()

		if (keys === 'all') {
			return data.filter(
				(x) =>
					x.srp
						.toString()
						.toLowerCase()
						.includes(queryLowerCase) ||
					x.namadokter.toLowerCase().includes(queryLowerCase) ||
					x.spesialis.toLowerCase().includes(queryLowerCase)
			);
		} else if (keys === 'srp') {
			return data.filter((x) =>
				x.srp
					.toString()
					.toLowerCase()
					.includes(queryLowerCase)
			);
		} else if (keys === 'namadokter') {
			return data.filter((x) => x.namadokter.toLowerCase().includes(queryLowerCase));
		} else if (keys === 'spesialis') {
			return data.filter((x) => x.spesialis.toLowerCase().includes(queryLowerCase));
		}
	};

	const dataDokterOption = [
		{ value: 'all', label: 'Semua Kategori' },
		{ value: 'srp', label: 'NPA IDI' },
		{ value: 'namadokter', label: 'Nama Lengkap' },
		{ value: 'spesialis', label: 'Spesialis' },
	];

    const handleSubmit = (e) => {
        e.preventDefault()
        getNoUrut()
    }
    
    return(
        <div className={style.container}>
            {loading && (<BackdropLoading/>)}
            <div className={style.header_container}>
                <div className={style.icon}>
                    <AppLogo/>
                </div>
                <p className={style.header}>Tambah Jadwal</p>
            </div>

            <div className={style.step_container}>
                <div className={style.step_group} style={step_progress}>
                    <StepCard image={pasien_icon} text={"1.Pilih Pasien"}/>
                </div>

                <div className={style.step_group} style={
                    step === "step2" || step === "step3" ? step_progress : {}
                }>
                    <hr />
                    <StepCard image={dokter_icon} text={"2.Pilih Dokter"}/>
                </div>

                <div className={style.step_group} style={step === "step3" ? step_progress : {}}>
                    <hr />
                    <StepCard image={jadwal_icon} text={"3.Pilih Jadwal"}/>
                </div>
            </div>
            
            {step === "step1" && (
                <div className={style.table_container}>
                    <div className={style.search_container}>
                        <Searchbar
                            dataOption={dataPasienOption}
                            onChangeQuery={(e) => setQuery(e.target.value)}
                            onChangeSelect={(e) => setKey(e.target.value)}
                            placeholder={'Cari Data Pasien'}
                        />
                    </div>

                    <Table
                        column={column_step1}
                        data={searchPasien(dataPasien)}
                        primaryKey={"id"}
                        aksi={aksi_step1}
                    />

                    <ButtonKembali
                        title={"KEMBALI"}
                        onClick={() => {
                            navigate(-1)
                            
                            setKey("all")
                            setQuery("")
                        }}
                    />
                </div>
            )}

            {step === "step2" && (
                <div className={style.table_container}>
                    <div className={style.search_container}>
                        <Searchbar
                            onChangeQuery={(e) => setQuery(e.target.value)}
                            onChangeSelect={(e) => setKey(e.target.value)}
                            dataOption={dataDokterOption}
                            placeholder={'Cari Data Dokter'}
                        />
                    </div>

                    <Table
                        column={column_step2}
                        data={searchDokter(dataDokter)}
                        primaryKey={"id"}
                        aksi={aksi_step2}
                    />

                    <ButtonKembali
                        title={"KEMBALI"}
                        onClick={() => {
                            setStep("step1")

                            setKey("all")
                            setQuery("")
                        }}
                    />
                </div>
            )}

            {step === "step3" && (
                <div className={style.form_container}>
                    <form onSubmit={handleSubmit}>
                        <div className={style.pasien_dokter_container}>
                            <p>Nama Pasien: <span>{selected.pasien.namapasien}</span></p>
                            <p>Nama Dokter: <span>{selected.dokter.namadokter}</span></p>
                        </div>
                        <div className={style.input_container}>
                            <p>Pilih Tanggal<span style={{color: "#EC0000"}}>*</span></p>
                            <input type="date" name="tanggal" 
                                    min={`${moment().format("YYYY-MM-DD")}`} max={"9999-12-31"} 
                                    onChange={(e) => handleChangeForm(e)} required
                            />
                        </div>
                        <div className={style.input_container}>
                            <p>Jenis Perawatan<span style={{color: "#EC0000"}}>*</span></p>
                            <select value={jadwal.jp} name={"jp"} onChange={(e) => handleChangeForm(e)} required>
                                <option value="" disabled hidden>Pilih jenis perawatan</option>
                                <option value="Perawatan Biasa">Perawatan Biasa</option>
                                <option value="Rawat Jalan">Rawat Jalan</option>
                            </select>
                        </div>

                        <div className={style.button_container}>
                            <ButtonKembali
                                title={"KEMBALI"}
                                onClick={() => {setStep("step2")}}
                            />
                            <ButtonPrimary
                                title={"SIMPAN"}
                                onClick={() => {}}
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default TambahJadwal