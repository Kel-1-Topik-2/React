import React from "react";

import { useState,useEffect } from "react";

import axios from "../../API/api";

import { useNavigate } from "react-router";

import moment from "moment";

import style from "./style.module.css"

import AppLogo from "../../component/AppLogo/AppLogo"
import StepCard from "../../component/StepCard/StepCard";
import Table from "../../component/Table/Table";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary"
import ButtonKembali from "../../component/button-kembali/ButtonKembali";
import Modal from "../../component/ModalNew/Modal";

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

    const [popup, setPopup] = useState({ show: false });

    const step_progress = {
        filter: "invert(55%) sepia(86%) saturate(653%) hue-rotate(179deg) brightness(97%) contrast(93%)"
    }

    const getDataPasien = () => {
        const endPoint = "pasien"

        axios.get(endPoint).then((res) => {
            setDataPasien(res.data);
        });
    }

    const getDataDokter = () => {
        const endPoint = "dokter"

        axios.get(endPoint).then((res) => {
            const newData = res.data

            newData.forEach((dokter) => {
                dokter.username = dokter.user.username
            })
            
            setDataDokter(newData)
        });
    }
    
    const getNoUrut = () => {
        const endPoint = "jadwal"

        axios.get(endPoint)
        .then((res) => {
            setJadwal({...jadwal, nourut: res.data.length + 1})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getDataPasien()
        getDataDokter()
    }, [])

    useEffect(() => {
        //only run if no urut in jadwal change, that happens when form is submitted
        if(jadwal.nourut !== 0){
            const endpoint = "jadwal"
            axios.post(endpoint, {...jadwal})
            .then((res) => {
                setPopup({
                    show: true,
                })
            })
            .catch((err) => {
                console.log(err)
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
            },
            icon: tambah_icon
        },
    ]

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
            },
            icon: tambah_icon
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        getNoUrut()
    }
    
    return(
        <div className={style.container}>
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
                    <Table
                        column={column_step1}
                        data={dataPasien}
                        primaryKey={"id"}
                        aksi={aksi_step1}
                    />

                    <ButtonKembali
                        title={"KEMBALI"}
                        onClick={() => {navigate(-1)}}
                    />
                </div>
            )}

            {step === "step2" && (
                <div className={style.table_container}>
                    <Table
                        column={column_step2}
                        data={dataDokter}
                        primaryKey={"id"}
                        aksi={aksi_step2}
                    />

                    <ButtonKembali
                        title={"KEMBALI"}
                        onClick={() => {setStep("step1")}}
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
            {popup.show && (
                <Modal
                  title={"Jadwal Berhasil ditambahkan!"}
                  handleCancel={() => {
                    setPopup({
                        show: false,
                    });
                    navigate("/kelola-jadwal");
                  }}
                />
              )}
        </div>
    )
}

export default TambahJadwal