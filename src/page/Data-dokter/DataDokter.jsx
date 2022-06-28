import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from '../../dummy-api/api';

import style from './style.module.css';

import ButtonPrimary from '../../component/button-primary/ButtonPrimary';
import Sidebar from '../../component/Sidebar/Sidebar';
import Table from '../../component/Table/Table';

import detailIcon from '../../assets/img/detail_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';
import Searchbar from '../../component/Searchbar/Searchbar';
import Modal from '../../component/Modal/Modal';

const DataDokter = () => {
	const endPoint = 'Dokter';
	const [dataDokter, setDataDokter] = useState([]);
	const [popup, setPopup] = useState({show: false});
	const [idDokter, setIdDokter] = useState()
	const navigate = useNavigate();

	useEffect(() => {
		axios.get(endPoint).then((res) => {
			setDataDokter(res.data);
		});
	}, []);

	const handleDelete = (idDokter) => {
		setIdDokter(idDokter)
		setPopup({
			show: true,
		})
	}

	const handleDeleteTrue = () => {
		if (popup.show) {
			axios
				.delete(endPoint + `/${idDokter}`)
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
			show: false
		})
	}

	const detailClick = (idDokter) => {
		navigate(`/detail-data-dokter/${idDokter}`);
	};

	const [query, setQuery] = useState('');
	const [keys, setKey] = useState('all');

	const search = (data) => {
		if (keys === 'all') {
			return data.filter(
				(x) =>
					x.npa.toLowerCase().includes(query) ||
					x.nama.toLowerCase().includes(query) ||
					x.spesialis.toLowerCase().includes(query)
			);
		} else if (keys === 'npa') {
			return data.filter((x) => x.npa.toLowerCase().includes(query));
		} else if (keys === 'nama') {
			return data.filter((x) => x.nama.toLowerCase().includes(query));
		} else if (keys === 'spesialis') {
			return data.filter((x) => x.spesialis.toLowerCase().includes(query));
		}
	};

	const column = [
		{ field: 'npa', header: 'NPA IDI' },
		{ field: 'nama', header: 'Nama Lengkap' },
		{ field: 'userName', header: 'Username' },
		{ field: 'spesialis', header: 'Spesialis' },
	];

	const aksi = [
		{
			click: (idDokter) => detailClick(idDokter),
			icon: detailIcon,
		},
		{
			click: (idDokter) => handleDelete(idDokter),
			icon: deleteIcon,
		},
	];

	const dataOption = [
		{ value: 'all', label: 'Semua Kategori' },
		{ value: 'npa', label: 'NPA IDI' },
		{ value: 'nama', label: 'Nama Lengkap' },
		{ value: 'spesialis', label: 'Spesialis' },
	];

	return (
		<div>
			<Sidebar />
			<div className={style.container}>
				<div className={style.button}>
					<Searchbar
						onChangeQuery={(e) => setQuery(e.target.value)}
						onChangeSelect={(e) => setKey(e.target.value)}
						dataOption={dataOption}
						placeholder={'Cari Data Dokter'}
					/>
					<ButtonPrimary
						title={'Tambah Data'}
						onClick={() => {
							navigate('/add-data-dokter');
						}}
					/>
				</div>

				<Table
					column={column}
					data={search(dataDokter)}
					primaryKey={'idDokter'}
					aksi={aksi}
				/>
				{popup.show && (
					<Modal
						title={"Hapus Data Dokter"}
						text={"Yakin untuk menghapus data dokter?"}
						handleCancel={handleDeleteFalse}
						handleDeleteTrue={handleDeleteTrue}
					/>
				)}
			</div>
		</div>
	);
};

export default DataDokter;
