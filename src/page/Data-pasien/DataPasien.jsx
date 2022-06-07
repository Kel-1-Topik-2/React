import React, { useState, useEffect } from 'react';
import TableRow from '../../component/tableRow/TableRow';
import axios from '../../dummy-api/api';

const DataPasien = () => {
	const endPoint = 'Pasien';
	const [dataPasien, setDataPasien] = useState([]);

	useEffect(() => {
		axios.get(endPoint).then((res) => {
			console.log(res.data);
			setDataPasien(res.data);
		});
	}, [dataPasien]);

	return (
		<>
			<table width={'909px'}>
				<tr
					style={{
						textAlign: 'left',
					}}
				>
					<th>ID</th>
					<th>Nama Lengkap</th>
					<th>NIK</th>
					<th>Usia</th>
					<th>Aksi</th>
				</tr>
				{dataPasien.map((pasien) => {
					return <TableRow item={pasien} key={pasien.idPasien} />;
				})}
			</table>
		</>
	);
};

export default DataPasien;
