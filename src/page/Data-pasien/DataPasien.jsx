import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import TableRow from '../../component/tableRow/TableRow';
import axios from '../../dummy-api/api';
import './style.css';
import TableHeader from '../../component/tableHeader/TableHeader';

const DataPasien = () => {
	const endPoint = 'Pasien';
	const [dataPasien, setDataPasien] = useState([]);

	useEffect(() => {
		axios.get(endPoint).then((res) => {
			setDataPasien(res.data);
		});
	}, []);

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
										colEmpat={pasien.umur}
										onClickDelete={() => {}}
										onClickDetail={() => {}}
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
