import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Grid,
	IconButton,
	Paper,
	Tooltip,
	Typography,
	FormControl,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	Radio,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import image from '../../assets/sideFoto/foto.png';
import FormInput from '../../component/formInput/FormInput';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from '../../dummy-api/api';

export default function Form() {
	let navigate = useNavigate();
	const location = useLocation();

	const [editPasien, setEditPasien] = useState({
		nama: location.state.nama,
		nik: location.state.nik,
		telp: location.state.telp,
		usia: location.state.usia,
		alamat: location.state.alamat,
	});

	const [radioValue, setRadioValue] = useState(location.state.jk);
	const handleRadioEdit = (e) => {
		setRadioValue(e.target.value);
	};

	useEffect(() => {
		console.log(radioValue);
	}, [radioValue])

	const handleBack = () => {
		navigate(-1);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const newData = {
			nama: editPasien.nama,
			nik: editPasien.nik,
			telp: editPasien.telp,
			usia: editPasien.usia,
			jk: radioValue,
			alamat: editPasien.alamat,
		};
		axios.put(`Pasien/${location.state.idPasien}`, newData).then((res) => {
			console.log(res.data);
			alert('Perubahan di simpan');
		});
	};

	const handleChange = (e) => {
		setEditPasien({
			...editPasien,
			[e.target.name]: e.target.value,
		});
	};

	const paperStyle = {
		padding: '30px 30px',
		margin: '50px auto',
		borderRadius: '20px',
	};

	const gridImage = {
		backgroundImage: `url(${image})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	};

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<Grid
				item
				xs={false}
				sm={4}
				md={4}
				style={gridImage}
				container
				direction="column"
				sx={{ padding: '40px' }}
			>
				<Grid item xs>
					<Tooltip title="back">
						<IconButton>
							<ArrowBackIcon
								sx={{ fontSize: 60, color: '#000000' }}
								onClick={handleBack}
							/>
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid>
					<Typography variant="h3" component="div">
						<strong>Edit Data Pasien</strong>
					</Typography>
				</Grid>
			</Grid>
			<Grid item xs={12} sm={8} md={8} sx={{ backgroundColor: '#EEEEEE' }}>
				<Box
					sx={{
						my: 4,
						mx: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Paper elevation={4} style={paperStyle}>
						<Box
							component="form"
							sx={{
								marginTop: 3,
								marginBottom: 3,
							}}
							onSubmit={handleSubmit}
						>
							<Grid container spacing={2}>
								<Grid item xs={7}>
									<FormInput
										name={'nama'}
										title="Nama lengkap*"
										type="text"
										onChange={handleChange}
										value={editPasien.nama}
									/>
								</Grid>
								<Grid item xs={5}>
									<FormInput
										name={'telp'}
										title="Nomor Handphone*"
										type="text"
										onChange={handleChange}
										value={editPasien.telp}
									/>
								</Grid>
								<Grid item xs={6}>
									<FormInput
										name={'nik'}
										title="NIK*"
										type="text"
										onChange={handleChange}
										value={editPasien.nik}
									/>
								</Grid>
								<Grid item xs={2}>
									<FormInput
										name={'usia'}
										title="Usia*"
										type="number"
										onChange={handleChange}
										value={editPasien.usia}
									/>
								</Grid>
								<Grid item xs={4}>
									<FormControl>
										<FormLabel
											id="demo-row-radio-buttons-group-label"
											sx={{ color: '#358C56' }}
										>
											<strong>Jenis Kelamin</strong>
										</FormLabel>
										<RadioGroup
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="row-radio-buttons-group"
											value={radioValue}
											onChange={handleRadioEdit}
										>
											<FormControlLabel
												value="Laki-Laki"
												control={<Radio />}
												label="L"
											/>
											<FormControlLabel
												value="Perempuan"
												control={<Radio />}
												label="P"
											/>
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<FormInput
										name={'alamat'}
										title="Alamat Rumah*"
										type="text"
										multiline
										rows={3}
										onChange={handleChange}
										value={editPasien.alamat}
									/>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={2}
								sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}
							>
								<Grid item>
									<Button
										variant="outlined"
										color="error"
										onClick={() => {
											navigate(-2);
										}}
										sx={{
											width: '160px',
											height: '50px',
											borderRadius: '20px',
											fontSize: '16px',
										}}
									>
										<strong>BATAL</strong>
									</Button>
								</Grid>
								<Grid item>
									<Button
										variant="contained"
										type="submit"
										onClick={handleSubmit}
										sx={{
											width: '160px',
											height: '50px',
											borderRadius: '20px',
											fontSize: '16px',
										}}
									>
										<strong>Simpan</strong>
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Paper>
				</Box>
			</Grid>
		</Grid>
	);
}
