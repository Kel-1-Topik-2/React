import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import axios from '../../dummy-api/api';
import { useNavigate } from 'react-router-dom';
import Table from '../../component/Table/Table';
import ButtonPrimary from '../../component/button-primary/ButtonPrimary';
import style from './style.module.css';

import detailIcon from '../../assets/img/detail_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';
import Searchbar from '../../component/Searchbar/Searchbar';

const DataPasien = () => {
	const endPoint = 'Pasien';
	const [dataPasien, setDataPasien] = useState([]);
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		axios.get(endPoint).then((res) => {
			setDataPasien(res.data);
		});
	}, []);

	const handleDelete = (idPasien) => {
		const answer = window.confirm('Anda yakin untuk menghapus data?');

		if (answer) {
			axios
				.delete(endPoint + `/${idPasien}`)
				.then((res) => {
					alert('Data berhasil dihapus!');
					navigate(0);
				})
				.catch((err) => console.log(err));
		}
	};

	const detailClick = (idPasien) => {
		navigate(`/detail-data-pasien/${idPasien}`);
	};

	const [key, setKey] = useState('nama');

	const handleSearch = (data) => {
		return data.filter((item) => item[key].toLowerCase().includes(query));
	};

	const column = [
		{ field: 'idPasien', header: 'ID' },
		{ field: 'nama', header: 'Nama Lengkap' },
		{ field: 'nik', header: 'NIK' },
		{ field: 'usia', header: 'Usia' },
	];

	const aksi = [
		{
			click: (idPasien) => detailClick(idPasien),
			icon: detailIcon,
		},
		{
			click: (idPasien) => handleDelete(idPasien),
			icon: deleteIcon,
		},
	];

	const dataOption = [
		{ value: 'nama', label: 'semua kategori' },
		{ value: 'idPasien', label: 'ID' },
		{ value: 'nama', label: 'Nama Lengkap' },
		{ value: 'nik', label: 'NIK' },
	];

	useEffect(() => {
		console.log(key);
	}, [key]);

	return (
		<div>
			<Sidebar />
			<div className={style.container}>
				<div className={style.button}>
					<ButtonPrimary
						title={'Tambah Data'}
						onClick={() => {
							navigate('/add-data-pasien');
						}}
					/>
				</div>
				<div className={style.outer}>
					<div>
						<select name="" id="">
							<option value="">All</option>
						</select>
					</div>
					<Searchbar
						dataOption={dataOption}
						onChangeQuery={(e) => setQuery(e.target.value)}
						onChangeSelect={(e) => setKey(e.target.value)}
					/>
				</div>
				<Table
					column={column}
					data={handleSearch(dataPasien)}
					primaryKey={'idPasien'}
					aksi={aksi}
				/>
			</div>
		</div>
	);
};

export default DataPasien;
