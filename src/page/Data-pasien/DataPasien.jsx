import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import Table from '../../component/Table/Table';
import ButtonPrimary from '../../component/button-primary/ButtonPrimary';
import style from './style.module.css';
import axios from '../../API/api';

import detailIcon from '../../assets/img/detail_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';
import Searchbar from '../../component/Searchbar/Searchbar';
import Modal from '../../component/Modal/Modal';

const DataPasien = () => {
	const endPoint = 'pasien';
	const [dataPasien, setDataPasien] = useState([]);
	const [query, setQuery] = useState('');
	const [popup, setPopup] = useState({ show: false });
	const [idPasien, setIdPasien] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		axios.get(endPoint).then((res) => {
			setDataPasien(res.data);
		});
	}, []);

	const handleDelete = (idPasien) => {
		setIdPasien(idPasien);
		setPopup({
			show: true,
		});
	};

	const handleDeleteTrue = () => {
		if (popup.show) {
			axios
				.delete(endPoint + `/${idPasien}`)
				.then((res) => {
					setPopup({
						show: false,
					});
					navigate(0);
				})
				.catch((err) => console.log(err));
		}
	};

	const detailClick = (id) => {
		navigate(`/detail-data-pasien/${id}`);
	};
	const handleDeleteFalse = () => {
		setPopup({
			show: false,
		});
	};

	const [keys, setKey] = useState('all');

	const search = (data) => {
		if (keys === 'all') {
			return data.filter(
				(x) =>
					x.id
						.toString()
						.toLowerCase()
						.includes(query) ||
					x.namapasien.toLowerCase().includes(query) ||
					x.nik
						.toString()
						.toLowerCase()
						.includes(query)
			);
		} else if (keys === 'id') {
			return data.filter((x) =>
				x.id
					.toString()
					.toLowerCase()
					.includes(query)
			);
		} else if (keys === 'nama') {
			return data.filter((x) => x.namapasien.toLowerCase().includes(query));
		} else if (keys === 'nik') {
			return data.filter((x) =>
				x.nik
					.toString()
					.toLowerCase()
					.includes(query)
			);
		}
		console.log(keys);
		return data;
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

	const dataOption = [
		{ value: 'all', label: 'Semua Kategori' },
		{ value: 'id', label: 'ID' },
		{ value: 'nama', label: 'Nama Lengkap' },
		{ value: 'nik', label: 'NIK' },
	];

	useEffect(() => {
		console.log(keys);
	}, []);

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
					primaryKey={'id'}
					aksi={aksi}
				/>
				{popup.show && (
					<Modal
						title={'Hapus Data Pasien'}
						text={'Yakin untuk menghapus data pasien?'}
						handleCancel={handleDeleteFalse}
						handleDeleteTrue={handleDeleteTrue}
					/>
				)}
			</div>
		</div>
	);
};

export default DataPasien;
