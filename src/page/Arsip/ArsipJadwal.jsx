import React, { useState, useEffect } from 'react';
import Searchbar from '../../component/Searchbar/Searchbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Table from '../../component/Table/Table';
import style from './style.module.css';
import axios from '../../dummy-api/api';
import arsipIcon from '../../assets/img/arsip_icon.svg';
import { useNavigate } from 'react-router-dom';
const ArsipJadwal = () => {
	const [dataArsip, setDataArsip] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		axios.get('Jadwal').then((res) => {
			setDataArsip(res.data);
		});
	}, []);

	// Table
	const detailClick = (idJadwal) => {
		navigate(`/arsip-jadwal/review/${idJadwal}`);
	};

	const column = [
		{ field: 'idPasien', header: 'ID' },
		{ field: 'namaPasien', header: 'Nama Pasien' },
		{ field: 'jenisPerawatan', header: 'Jenis Perawatan' },
		{ field: 'tanggal', header: 'Tanggal Kunjungan' },
	];

	const aksi = [
		{
			click: (idJadwal) => detailClick(idJadwal),
			icon: arsipIcon,
		},
	];

	// Searchbar
	const [query, setQuery] = useState('');
	const [keys, setKey] = useState('all');

	const search = (data) => {
		if (keys === 'all') {
			return data.filter(
				(x) =>
					x.idPasien
						.toString()
						.toLowerCase()
						.includes(query) ||
					x.namaPasien.toLowerCase().includes(query) ||
					x.tanggal.toLowerCase().includes(query)
			);
		} else if (keys === 'idPasien') {
			return data.filter((x) =>
				x.idPasien
					.toString()
					.toLowerCase()
					.includes(query)
			);
		} else if (keys === 'namaPasien') {
			return data.filter((x) => x.namaPasien.toLowerCase().includes(query));
		} else if (keys === 'tanggal') {
			return data.filter((x) => x.tanggal.toLowerCase().includes(query));
		}
	};

	const dataOption = [
		{ value: 'all', label: 'Semua Kategori' },
		{ value: 'idPasien', label: 'ID' },
		{ value: 'namaPasien', label: 'Nama Lengkap' },
		{ value: 'tanggal', label: 'TGL Kunjungan' },
	];
	return (
		<div>
			<Sidebar />
			<div className={style.container}>
				<div className={style.search}>
					<Searchbar
						onChangeQuery={(e) => setQuery(e.target.value)}
						onChangeSelect={(e) => setKey(e.target.value)}
						dataOption={dataOption}
						yy
						placeholder={'Cari Data Pasien'}
					/>
				</div>
				<Table
					column={column}
					data={search(dataArsip)}
					aksi={aksi}
					primaryKey={'idJadwal'}
				/>
			</div>
		</div>
	);
};

export default ArsipJadwal;
