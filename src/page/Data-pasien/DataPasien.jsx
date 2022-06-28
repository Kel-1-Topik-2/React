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
import Modal from '../../component/Modal/Modal';

const DataPasien = () => {
	const endPoint = 'Pasien';
	const [dataPasien, setDataPasien] = useState([]);
	const [query, setQuery] = useState('');
	const [popup, setPopup] = useState({show: false});
	const [idPasien, setIdPasien] = useState()
	const navigate = useNavigate();

	useEffect(() => {
		axios.get(endPoint).then((res) => {
			setDataPasien(res.data);
		});
	}, []);

	const handleDelete = (idPasien) => {
		setIdPasien(idPasien)
		setPopup({
			show: true,
		})
	}

	const handleDeleteTrue = () => {
		console.log(idPasien);
		if (popup.show) {
			axios
				.delete(endPoint + `/${idPasien}`)
				.then((res) => {
					setPopup({
						show: false
					})
					navigate(0);
				})
				.catch((err) => console.log(err));
		}
	};

	const handleDeleteFalse = () => {
		setPopup({
			show: false,
		})
	}

	const detailClick = (idPasien) => {
		navigate(`/detail-data-pasien/${idPasien}`);
	};

	const [keys, setKey] = useState('all');

	const search = (data) => {
		if (keys === 'all') {
			return data.filter(
				(x) =>
					x.idPasien.toLowerCase().includes(query) ||
					x.nama.toLowerCase().includes(query) ||
					x.nik.toLowerCase().includes(query)
			);
		} else if (keys === 'idPasien') {
			return data.filter((x) => x.idPasien.toLowerCase().includes(query));
		} else if (keys === 'nama') {
			return data.filter((x) => x.nama.toLowerCase().includes(query));
		} else if (keys === 'nik') {
			return data.filter((x) => x.nik.toLowerCase().includes(query));
		}
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
		{ value: 'all', label: 'Semua Kategori' },
		{ value: 'idPasien', label: 'ID' },
		{ value: 'nama', label: 'Nama Lengkap' },
		{ value: 'nik', label: 'NIK' },
	];

	useEffect(() => {
		console.log(keys);
	}, [keys]);

	return (
		<div>
			<Sidebar />
			<div className={style.container}>
				<div className={style.button}>
					<Searchbar
						dataOption={dataOption}
						onChangeQuery={(e) => setQuery(e.target.value)}
						onChangeSelect={(e) => setKey(e.target.value)}
						placeholder={'Cari Data Pasien'}
					/>
					<ButtonPrimary
						title={'Tambah Data'}
						onClick={() => {
							navigate('/add-data-pasien');
						}}
					/>
				</div>

				<Table
					column={column}
					data={search(dataPasien)}
					primaryKey={'idPasien'}
					aksi={aksi}
				/>
			{popup.show && (
				<Modal
					title={"Hapus Data Pasien"}
					text={"Yakin untuk menghapus data pasien?"}
					handleCancel={handleDeleteFalse}
					handleDeleteTrue={() => handleDeleteTrue()}
				/>
			)}
			</div>
		</div>
	);
};

export default DataPasien;
