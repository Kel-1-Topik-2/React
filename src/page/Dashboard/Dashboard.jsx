import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from '../../API/api';
import style from './style.module.css';

import Sidebar from '../../component/Sidebar/Sidebar';
import OverviewCard from '../../component/OverviewCard/OverviewCard';
import Table from '../../component/Table/Table';

import pasien_icon from '../../assets/img/pasien_icon.svg';
import dokter_icon from '../../assets/img/dokter_icon.svg';
import suster_icon from '../../assets/img/suster_icon.svg';
import pertemuan_icon from '../../assets/img/pertemuan_icon.svg';
import detailIcon from '../../assets/img/detail_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';

const Dashboard = () => {
	const navigate = useNavigate();

	const endPoint = 'pasien';
	const [dataPasien, setDataPasien] = useState([]);

	useEffect(() => {
		axios.get(endPoint).then((res) => {
			setDataPasien(res.data);
		});
	}, []);

	const handleDelete = (id) => {
		const answer = window.confirm('Anda yakin untuk menghapus data?');

		if (answer) {
			axios
				.delete(endPoint + `/${id}`)
				.then((res) => {
					alert('Data berhasil dihapus!');
					navigate(0);
				})
				.catch((err) => console.log(err));
		}
	};

	const detailClick = (id) => {
		navigate(`/detail-data-pasien/${id}`);
	};

	const column = [
		{ field: 'id', header: 'ID' },
		{ field: 'namapasien', header: 'Nama Lengkap' },
		{ field: 'nik', header: 'NIK' },
		{ field: 'umur', header: 'Usia' },
	];

	const aksi = [
		{
			click: (id) => detailClick(id),
			icon: detailIcon,
		},
		{
			click: (id) => handleDelete(id),
			icon: deleteIcon,
		},
	];

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
					primaryKey={'id'}
					aksi={aksi}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
