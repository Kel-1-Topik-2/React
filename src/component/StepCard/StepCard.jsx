import React from "react";

import style from "./style.module.css"

const StepCard = ({image,text}) => {
    return(
        <div className={style.step}>
            <div className={style.step_icon}>
                <img src={image} alt="" />
            </div>
            <p>{text}</p>
        </div>
    )
}

export default StepCard