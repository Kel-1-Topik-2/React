import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Searchbar from '../../component/Searchbar/Searchbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Table from '../../component/Table/Table';
import style from './style.module.css';
import axios from '../../API/api';
import arsipIcon from '../../assets/img/arsip_icon.svg';
import { useNavigate } from 'react-router-dom';
const ArsipJadwal = () => {

	const navigate = useNavigate();

	const [dataArsip, setDataArsip] = useState([]);
	const endPoint = "jadwal"

	useEffect(() => {
		const status = localStorage.getItem("token")
  
		if(status === null){
			navigate("/login", {replace: true})
		}
		else{
			getJadwal()
		}
	}, []);

	const getJadwal = () => {
		axios.get(endPoint, {
			headers: {
				"content-type": "application/json",
				'Authorization': `Bearer ${localStorage.getItem("token")}`
			}
		}).then((res) => {
			const newData = res.data;

			newData.forEach((jadwal) => {
				jadwal.idpasien = jadwal.pasien.id
				jadwal.namapasien = jadwal.pasien.namapasien
			});
			setDataArsip(newData);
		}).catch((err) => {
			if(err.response.status === 403){
				Swal.fire({
				  icon: 'warning',
				  title: 'Oops',
				  text: 'Sesi anda sudah berakhir, silahkan login kembali',
				}).then(() => {
					localStorage.removeItem("token")
				  	navigate("/login")
				})
			}
		});
	}

	// Table
	const detailClick = (idJadwal) => {
		navigate(`/arsip-jadwal/review/${idJadwal}`);
	};

	const column = [
		{ field: 'idpasien', header: 'ID' },
		{ field: 'namapasien', header: 'Nama Pasien' },
		{ field: 'jp', header: 'Jenis Perawatan' },
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
		let queryLowerCase = query.toLowerCase()

		if (keys === 'all') {
			return data.filter(
				(x) =>
					x.idpasien
						.toString()
						.toLowerCase()
						.includes(queryLowerCase) ||
					x.namapasien.toLowerCase().includes(queryLowerCase) ||
					x.jp.toLowerCase().includes(queryLowerCase) ||
					x.tanggal.toLowerCase().includes(queryLowerCase)
			);
		} else if (keys === 'idpasien') {
			return data.filter((x) =>
				x.idpasien
					.toString()
					.toLowerCase()
					.includes(queryLowerCase)
			);
		} else if (keys === 'namapasien') {
			return data.filter((x) => x.namapasien.toLowerCase().includes(queryLowerCase));
		} else if (keys === 'jp') {
			return data.filter((x) => x.jp.toLowerCase().includes(queryLowerCase));
		} else if (keys === 'tanggal') {
			return data.filter((x) => x.tanggal.toLowerCase().includes(queryLowerCase));
		}
	};

	const dataOption = [
		{ value: 'all', label: 'Semua Kategori' },
		{ value: 'idpasien', label: 'ID' },
		{ value: 'namapasien', label: 'Nama Pasien' },
		{ value: 'jp', label: 'Jenis Perawatan'},
		{ value: 'tanggal', label: 'Tanggal Kunjungan' },
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
					primaryKey={'id'}
				/>
			</div>
		</div>
	);
};

export default ArsipJadwal;
