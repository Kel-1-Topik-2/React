import React, {useEffect} from "react";

import { useNavigate } from "react-router-dom";

import style from "./style.module.css"

import ButtonPrimary from "../../component/button-primary/ButtonPrimary";

import notFoundIcon from "../../assets/img/404_error.svg"

const NotFound = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const status = localStorage.getItem("token")
  
        if(status === null){
            navigate("/login", {replace: true})
        }
    }, [])

    return(
        <div className={style.container}>
            <img src={notFoundIcon} alt="" />
            <p>Halaman tak ditemukan...</p>
            <ButtonPrimary
                title={"Kembali"}
                onClick={() => {navigate(-1)}}
            />
        </div>
    )
}

export default NotFound