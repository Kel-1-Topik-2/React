import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import axios from '../../dummy-api/api';
import Table from '../../component/Table/Table';
import style from './style.module.css';
import ButtonPrimary from '../../component/button-primary/ButtonPrimary';
import { useNavigate } from 'react-router-dom';

const DataPasien = () => {
	const endPoint = 'Pasien';
	const [dataPasien, setDataPasien] = useState([]);
	const navigate = useNavigate();

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

	return (
		<div>
			<Sidebar />
			<div className={style.container}>
				<div className={style.button}>
					<ButtonPrimary
						title={'Tambah Data'}
						onClick={() => {
							navigate('/AddData');
						}}
					/>
				</div>
				<Table
					column={['ID', 'NAMA LENGKAP', 'NIK', 'USIA']}
					data={dataPasien}
					onDelete={handleDelete}
					detailClick={detailClick}
				/>
			</div>
		</div>
	);
};

export default DataPasien;
