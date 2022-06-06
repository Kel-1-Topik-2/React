import style from "./style.module.css"

import Sidebar from "../../component/Sidebar/Sidebar";
import OverviewCard from "../../component/OverviewCard/OverviewCard";

import pasien_icon from "../../assets/img/pasien_icon.svg"
import dokter_icon from "../../assets/img/dokter_icon.svg"
import suster_icon from "../../assets/img/suster_icon.svg"
import pertemuan_icon from "../../assets/img/pertemuan_icon.svg"

const Dashboard = () => {
  return (
    <div>
      <Sidebar/>
      <div className={style.container}>
        <div className={style.overview_container}>
          <p className={style.overview_header}>Overview</p>
          <div className={style.overview}>
            <OverviewCard amount={478} type={"Pasien"} icon={pasien_icon}/>
            <OverviewCard amount={272} type={"Dokter"} icon={dokter_icon}/>
            <OverviewCard amount={67} type={"Suster"} icon={suster_icon}/>
            <OverviewCard amount={78} type={"Pertemuan hari ini"} icon={pertemuan_icon}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
