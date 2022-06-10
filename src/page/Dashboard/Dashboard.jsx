import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from '../../dummy-api/api';

import style from './style.module.css';

import Sidebar from '../../component/Sidebar/Sidebar';
import OverviewCard from '../../component/OverviewCard/OverviewCard';
import Table from '../../component/Table/Table';

import pasien_icon from '../../assets/img/pasien_icon.svg';
import dokter_icon from '../../assets/img/dokter_icon.svg';
import suster_icon from '../../assets/img/suster_icon.svg';
import pertemuan_icon from '../../assets/img/pertemuan_icon.svg';

const Dashboard = () => {

	const navigate = useNavigate()

	const endPoint = 'Pasien';
	const [dataPasien, setDataPasien] = useState([]);

	useEffect(() => {
		axios.get(endPoint).then((res) => {
			setDataPasien(res.data);
		});
	}, [dataPasien]);

	const handleDelete = (idPasien) => {
		axios
			.delete(endPoint + `/${idPasien}`)
			.then((res) => {
				console.log(res.data);
				alert('Deleted!');
			})
			.catch((err) => console.log(err));
	};

	const detailClick = (idPasien) => {
		navigate(`/DetailData/${idPasien}`);
	};

	const column = [
		{field: "idPasien", header: "ID"},
		{field: "nama", header: "NAMA LENGKAP"},
		{field: "nik", header: "NIK"},
		{field: "usia", header: "USIA"},
	]

	return (
		<div>
			<Sidebar />
			<div className={style.container}>
				<div className={style.overview_container}>
					<p className={style.header}>Overview</p>
					<div className={style.overview}>
						<OverviewCard amount={478} type={'Pasien'} icon={pasien_icon} />
						<OverviewCard amount={272} type={'Dokter'} icon={dokter_icon} />
						<OverviewCard amount={67} type={'Suster'} icon={suster_icon} />
						<OverviewCard
							amount={78}
							type={'Pertemuan hari ini'}
							icon={pertemuan_icon}
						/>
					</div>
				</div>

				<p className={style.header}>Data Pasien Terkini</p>
				<Table
					column={column}
					data={dataPasien.slice(0, 9)}
					onDelete={handleDelete}
					detailClick={detailClick}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
