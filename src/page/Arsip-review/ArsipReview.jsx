import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import InputReview from '../../component/Input-review/InputReview';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../dummy-api/api';
import { Tooltip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ArsipReview = () => {
	const params = useParams();
	const navigate = useNavigate();
	const endPoint = `Jadwal/${params.id}`;
	const [dataReview, setDataReview] = useState([]);

	useEffect(() => {
		axios
			.get(endPoint)
			.then((res) => {
				setDataReview(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className={style.container}>
			<div className={style.head}>
				<Tooltip title="back">
					<IconButton>
						<ArrowBackIcon
							sx={{ fontSize: 38, color: '#000000' }}
							onClick={() => {
								navigate(-1);
							}}
						/>
					</IconButton>
				</Tooltip>
				<h1 className={style.title}>Review</h1>
			</div>
			<div className={style.form}>
				<div className={style.leftBox}>
					{/* Row 1 */}
					<div>
						<label className={style.label}>Tanggal Kunjungan</label>
						<InputReview type="text" value={dataReview.tanggal} width="257px" />
					</div>
					{/* Row 2 */}
					<div className={style.rowDua}>
						<div>
							<label className={style.label}>ID</label>
							<InputReview
								type="text"
								value={dataReview.idPasien}
								width="257px"
							/>
						</div>
						<div>
							<label className={style.label}>Jenis Perawatan</label>
							<InputReview
								type="text"
								value={dataReview.jenisPerawatan}
								width="257px"
							/>
						</div>
					</div>
					{/* Row 3 */}
					<div className={style.rowTiga}>
						<label className={style.label}>Nama Pasien</label>
						<InputReview
							type="text"
							value={dataReview.namaPasien}
							width="100%"
						/>
					</div>
					{/* Row 4 */}
					<div className={style.rowEmpat}>
						<label className={style.label}>Nama Dokter</label>
						<InputReview
							type="text"
							value={dataReview.namaDokter}
							width="100%"
						/>
					</div>
				</div>
				<div className={style.rightBox}>
					<div>
						<label className={style.label}>Diagnosa</label>
						<InputReview type="text" value={dataReview.diagnosa} width="100%" />
					</div>
					<div
						style={{
							marginTop: '32px',
						}}
					>
						<label className={style.label}>Catatan</label>
						<textarea
							disabled
							className={style.catatan}
							value={dataReview.catatan}
						></textarea>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArsipReview;
