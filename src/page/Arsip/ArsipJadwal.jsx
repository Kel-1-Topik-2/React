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
	const [key, setKey] = useState('namaPasien');

	const search = (data) => {
		return data.filter((item) =>
			item[key]
				.toString()
				.toLowerCase()
				.includes(query)
		);
	};

	const dataOption = [
		{ value: 'namaPasien', label: 'Semua Kategori' },
		{ value: 'idPasien', label: 'ID' },
		{ value: 'namaPasien', label: 'Nama Lengkap' },
		{ value: 'tanggal', label: 'TGL Kunjungan' },
	];
	return (
		<div>
			<Sidebar />
			<div className={style.container}>
				<div>
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
