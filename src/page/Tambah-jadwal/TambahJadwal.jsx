import React from "react";

import { useState,useEffect } from "react";

import axios from "../../dummy-api/api";

import { useNavigate } from "react-router";

import style from "./style.module.css"

import AppLogo from "../../component/AppLogo/AppLogo"
import StepCard from "../../component/StepCard/StepCard";
import Table from "../../component/Table/Table";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary"
import ButtonKembali from "../../component/button-kembali/ButtonKembali";

import pasien_icon from "../../assets/img/pasien_icon.svg"
import dokter_icon from "../../assets/img/dokter_icon.svg"
import jadwal_icon from "../../assets/img/pertemuan_icon.svg"
import tambah_icon from "../../assets/img/tambah_icon.svg"

const TambahJadwal = () => {

    const navigate = useNavigate()

    const [step, setStep] = useState("step1")
    const [dataPasien, setDataPasien] = useState([]);
    const [dataDokter, setDataDokter] = useState([]);

    const step_progress = {
        filter: "invert(55%) sepia(86%) saturate(653%) hue-rotate(179deg) brightness(97%) contrast(93%)"
    }

    const getDataPasien = () => {
        const endPoint = "Pasien"

        axios.get(endPoint).then((res) => {
            setDataPasien(res.data);
        });
    }

    const getDataDokter = () => {
        const endPoint = "Dokter"

        axios.get(endPoint).then((res) => {
            setDataDokter(res.data);
        });
    }

    useEffect(() => {
        getDataPasien()
        getDataDokter()
    }, [])

    const column_step1 = [
        { field: "idPasien", header: "ID" },
        { field: "nama", header: "Nama Lengkap" },
        { field: "nik", header: "NIK" },
        { field: "usia", header: "Usia" },
    ];
    
    const aksi_step1 = [
        {
            click: () => {setStep("step2")},
            icon: tambah_icon
        },
    ]

    const column_step2 = [
        { field: "npa", header: "NPA IDI" },
        { field: "nama", header: "Nama Lengkap" },
        { field: "userName", header: "Username" },
        { field: "spesialis", header: "Spesialis" },
    ];
    
    const aksi_step2 = [
        {
            click: () => {setStep("step3")},
            icon: tambah_icon
        },
    ]

    return(
        <div className={style.container}>
            <div className={style.header_container}>
                <div className={style.icon}>
                    <AppLogo/>
                </div>
                <p className={style.header}>Tambah Jadwal</p>
            </div>

            <div className={style.step_container}>
                <div className={style.step_group} style={
                    step === "step1" || step === "step2" || step === "step3" ? step_progress : {}
                }>
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
                        primaryKey={"idPasien"}
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
                        primaryKey={"idDokter"}
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
                    <form>
                        <div className={style.input_container}>
                            <p>Pilih Tanggal<span style={{color: "#EC0000"}}>*</span></p>
                            <input type="date" />
                        </div>
                        <div className={style.input_container}>
                            <p>Jenis Perawatan<span style={{color: "#EC0000"}}>*</span></p>
                            <select defaultValue={""}>
                                <option value="" disabled>Pilih jenis perawatan</option>
                                <option value="Rawat_biasa">perawatan biasa</option>
                                <option value="Rawat_jalan">rawat jalan</option>
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