import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import TableRow from '../../component/tableRow/TableRow';
import api from '../../dummy-api/api';
import './style.css';
import TableHeader from '../../component/tableHeader/TableHeader';
import axios from 'axios';

const DataPasien = () => {
	const URL = 'Pasien';
	const [dataPasien, setDataPasien] = useState([]);

	useEffect(() => {
		api
			.get(URL)
			.then((res) => {
				setDataPasien(res.data);
			})
			.catch((err) => console.log(err));
	}, [dataPasien]);

	const deletePatient = (idPasien) => {
		axios
			.delete(`https://629759e28d77ad6f7500a6e6.mockapi.io/Pasien/${idPasien}`)
			.then((res) => {
				console.log(res.data);
				alert('delete');
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div className="container-page">
				<Sidebar />
				<div
					style={{
						width: '350px',
					}}
				></div>
				<div>
					<div>
						<table width={'909px'}>
							<tr
								style={{
									textAlign: 'left',
								}}
							>
								<TableHeader
									header1={'ID'}
									header2={'Nama Lengkap'}
									header3={'NIK'}
									header4={'Usia'}
									header5={'Aksi'}
								/>
							</tr>
							{dataPasien.map((pasien) => {
								return (
									<TableRow
										colSatu={pasien.idPasien}
										colDua={pasien.nama}
										colTiga={pasien.nik}
										colEmpat={pasien.usia}
										onDelete={() => {
											deletePatient(pasien.idPasien);
										}}
									/>
								);
							})}
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default DataPasien;
