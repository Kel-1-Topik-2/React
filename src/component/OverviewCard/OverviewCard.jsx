import style from "./style.module.css"

const OverviewCard = ({amount, type, icon}) => {
    return(
        <div className={style.container}>
            <div>
                <p>{amount}</p>
                <span>{type}</span>
            </div>

            <img src={icon} alt="" />
        </div>
    )
}

export default OverviewCard