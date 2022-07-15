import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from '../../API/api';

import Swal from 'sweetalert2';

import style from './style.module.css';

import ButtonPrimary from '../../component/button-primary/ButtonPrimary';
import Sidebar from '../../component/Sidebar/Sidebar';
import Table from '../../component/Table/Table';
import BackdropLoading from '../../component/BackdropLoading/BackdropLoading';

import detailIcon from '../../assets/img/detail_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';
import Searchbar from '../../component/Searchbar/Searchbar';

const DataDokter = () => {

	const navigate = useNavigate();

	const [dataDokter, setDataDokter] = useState([]);
	const [loading, setLoading] = useState(false)

	const endPoint = 'dokter';

	useEffect(() => {
		const status = localStorage.getItem("token")
  
		if(status === null){
			navigate("/login", {replace: true})
		}
		else{
			getDataDokter();
		}
	}, []);

	const getDataDokter = () => {
		setLoading(true)

		axios.get(endPoint, {
			headers: {
				"content-type": "application/json",
				'Authorization': `Bearer ${localStorage.getItem("token")}`
			}
		}).then((res) => {
			setLoading(false)
			const newData = res.data;

			newData.forEach((dokter) => {
				dokter.username = dokter.user.username;
			});

			setDataDokter(newData);
		}).catch((err) => {
			setLoading(false)
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
	};

	const handleDelete = (idDokter) => {
		Swal.fire({
			title: "Apakah anda yakin untuk menghapus data?",
			showCancelButton: true,
			cancelButtonText: "Tidak",
			confirmButtonText: "Ya",
		}).then((result) => {
			if(result.isConfirmed){
				setLoading(true)

				axios.delete(endPoint + `/${idDokter}`, {
					headers: {
						"content-type": "application/json",
						'Authorization': `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then((res) => {
					Swal.fire({
						icon: 'success',
						title: 'Sukses!',
						text: 'Data telah berhasil dihapus!',
					})
					getDataDokter()
				})
				.catch((err) => {
					setLoading(false)
					console.log(err)
					Swal.fire({
						icon: 'error',
						title: 'Error!',
						text: 'Terjadi kesalahan',
					})
				});
			}
		})
	};

	const detailClick = (id) => {
		navigate(`/detail-data-dokter/${id}`);
	};

	const [query, setQuery] = useState('');
	const [keys, setKey] = useState('all');

	const search = (data) => {
		let queryLowerCase = query.toLowerCase()
		
		if (keys === 'all') {
			return data.filter(
				(x) =>
					x.srp
						.toString()
						.toLowerCase()
						.includes(queryLowerCase) ||
					x.namadokter.toLowerCase().includes(queryLowerCase) ||
					x.spesialis.toLowerCase().includes(queryLowerCase)
			);
		} else if (keys === 'srp') {
			return data.filter((x) =>
				x.srp
					.toString()
					.toLowerCase()
					.includes(queryLowerCase)
			);
		} else if (keys === 'namadokter') {
			return data.filter((x) => x.namadokter.toLowerCase().includes(queryLowerCase));
		} else if (keys === 'spesialis') {
			return data.filter((x) => x.spesialis.toLowerCase().includes(queryLowerCase));
		}
	};

	const dataOption = [
		{ value: 'all', label: 'Semua Kategori' },
		{ value: 'srp', label: 'NPA IDI' },
		{ value: 'namadokter', label: 'Nama Lengkap' },
		{ value: 'spesialis', label: 'Spesialis' },
	];

	const column = [
		{ field: 'srp', header: 'NPA IDI' },
		{ field: 'namadokter', header: 'Nama Lengkap' },
		{ field: 'username', header: 'Username' },
		{ field: 'spesialis', header: 'Spesialis' },
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
			{loading && (<BackdropLoading/>)}
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
					primaryKey={'id'}
					aksi={aksi}
				/>
			</div>
		</div>
	);
};

export default DataDokter;
