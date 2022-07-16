import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from '../../API/api';
import style from './style.module.css';

import Sidebar from '../../component/Sidebar/Sidebar';
import Table from '../../component/Table/Table';
import ButtonPrimary from '../../component/button-primary/ButtonPrimary';
import Searchbar from '../../component/Searchbar/Searchbar';
import BackdropLoading from '../../component/BackdropLoading/BackdropLoading';

import detailIcon from '../../assets/img/detail_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';

const DataPasien = () => {

	const navigate = useNavigate();

	const [dataPasien, setDataPasien] = useState([]);
	const [loading, setLoading] = useState(false)

	const endPoint = 'pasien';

	useEffect(() => {
		const status = localStorage.getItem("token")
  
		if(status === null){
			navigate("/login", {replace: true})
		}
		else{
			getDataPasien()
		}
	}, []);

	const getDataPasien = () => {
		setLoading(true)
		
		axios.get(endPoint, {
			headers: {
				"content-type": "application/json",
				'Authorization': `Bearer ${localStorage.getItem("token")}`
			}
		}).then((res) => {
			setLoading(false)
			setDataPasien(res.data.data);
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
	}

	const handleDelete = (idPasien) => {
		Swal.fire({
			title: "Apakah anda yakin untuk menghapus data?",
			showCancelButton: true,
			cancelButtonText: "Tidak",
			confirmButtonText: "Ya",
		}).then((result) => {
			if(result.isConfirmed){
				setLoading(true)

				axios.delete(endPoint + `/${idPasien}`, {
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
					getDataPasien()
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
		navigate(`/detail-data-pasien/${id}`);
	};

	const [keys, setKey] = useState('all');
	const [query, setQuery] = useState('');


	const search = (data) => {
		let queryLowerCase = query.toLowerCase()

		if (keys === 'all') {
			return data.filter(
				(x) =>
					x.id
						.toString()
						.toLowerCase()
						.includes(queryLowerCase) ||
					x.namapasien.toLowerCase().includes(queryLowerCase) ||
					x.nik
						.toString()
						.toLowerCase()
						.includes(queryLowerCase)
			);
		} else if (keys === 'id') {
			return data.filter((x) =>
				x.id
					.toString()
					.toLowerCase()
					.includes(queryLowerCase)
			);
		} else if (keys === 'nama') {
			return data.filter((x) => x.namapasien.toLowerCase().includes(queryLowerCase));
		} else if (keys === 'nik') {
			return data.filter((x) =>
				x.nik
					.toString()
					.toLowerCase()
					.includes(queryLowerCase)
			);
		}
		return data;
	};

	const dataOption = [
		{ value: 'all', label: 'Semua Kategori' },
		{ value: 'id', label: 'ID' },
		{ value: 'nama', label: 'Nama Lengkap' },
		{ value: 'nik', label: 'NIK' },
	];

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
			{loading && (<BackdropLoading/>)}
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
			</div>
		</div>
	);
};

export default DataPasien;
