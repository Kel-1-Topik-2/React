import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Grid,
	IconButton,
	Paper,
	Tooltip,
	Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import image from '../../assets/sideFoto/foto-dokter.png';
import FormInput from '../../component/formInput/FormInput';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../API/api';
import Swal from "sweetalert2";
import BackdropLoading from '../../component/BackdropLoading/BackdropLoading';

export default function Form() {
	let navigate = useNavigate();

	const location = useLocation();
	const [loading, setLoading] = useState(false)
	const [dataError, setDataError] = useState({});

	const [editDataDokter, setEditDataDokter] = useState({
		namadokter: location.state.namadokter,
		srp: location.state.srp,
		spesialis: location.state.spesialis,
		username: location.state.user.username,
		password: location.state.user.password,
		newPassword: '',
		confirmPassword: ''
	});
	
	console.log(editDataDokter)

	useEffect(() => {
		const status = localStorage.getItem('token');

		if (status === null) {
			navigate('/login', { replace: true });
		}
	}, []);

	const handleChange = (e) => {
		setEditDataDokter({
			...editDataDokter,
			[e.target.name]: e.target.value,
		});
	};

	const handleBack = () => {
		navigate(-1);
	};

	const handleCancel = () => {
		navigate('/');
	};

	let respUser;
	let respDokter;

	const handleSubmit = async (e) => {
		e.preventDefault();
		validate(editDataDokter);
		if (validate(editDataDokter) === true) {
			try {
				if (editDataDokter.newPassword === '') {
					setLoading(true)
					respUser = await axios.put(
						`/user/${location.state.user.id}`,
						{
							username: editDataDokter.username,
							password: editDataDokter.password,
						},
						{
							headers: {
								'content-type': 'application/json',
								Authorization: `Bearer ${localStorage.getItem('token')}`,
							},
						}
					);
				} else if (editDataDokter.newPassword !== '') {
					setLoading(true)
					respUser = await axios.put(
						`/api/auth/updateuser/${location.state.user.id}`,
						{
							new_username: editDataDokter.username,
							new_password: editDataDokter.newPassword,
						},
						{
							headers: {
								'content-type': 'application/json',
								Authorization: `Bearer ${localStorage.getItem('token')}`,
							},
						}
					);
				}
				if (respUser.status === 200) {
					respDokter = await axios.put(
						`/dokter/${location.state.id}`,
						{
							user_id: respUser.data.data.id,
							namadokter: editDataDokter.namadokter,
							spesialis: editDataDokter.spesialis,
							srp: editDataDokter.srp,
						},
						{
							headers: {
								'content-type': 'application/json',
								Authorization: `Bearer ${localStorage.getItem('token')}`,
							},
						}
					);
					if (respDokter.status === 200) {
						setLoading(false)
							Swal.fire({
								icon: 'success',
								title: 'Sukses...',
								text: 'Data telah berhasil diedit',
							}).then(() => {
								navigate(-1)
							})
					} else {
						return false;
					}
				} else {
					return false;
				}
			} catch (error) {
				setLoading(false)
				console.log(error);
				Swal.fire({
					icon: 'error',
					title: 'Error!',
					text: 'Terjadi kesalahan',
				})
			}
		}
	};

	const validate = (values) => {
		const errors = {};
		let validated = false;
		if (!values.username) {
			errors.username = 'username perlu dibutuhkan';
		} else if (values.username.length < 8) {
			errors.username = 'username perlu 8 digit';
		}

		if (values.newPassword !== '') {
			if(values.newPassword.length < 8) {
				errors.newPassword = "Kata Sandi perlu 8 digit"
			} else if (values.confirmPassword !== values.newPassword) {
				errors.confirmPassword = "Konfirmasi Kata sandi tidak sama"
			}
		}
		
		if (!values.namadokter) {
			errors.namadokter = 'nama dokter perlu dibutuhkan';
		} else if (!/^[a-zA-Z., ]*$/.test(values.namadokter)) {
			errors.namadokter = 'hanya mengandung huruf';
		}

		if (!values.spesialis) {
			errors.spesialis = 'spesialis perlu dibutuhkan';
		} else if (!/^[a-zA-Z., ]*$/.test(values.spesialis)) {
			errors.spesialis = 'tidak menggandung angka';
		}

		if (!values.srp) {
			errors.srp = 'NPA IDI perlu dibutuhkan';
		} else if (values.srp.length < 6) {
			errors.srp = 'NPA IDI minimal 6 karakter';
		} else if (!/^[0-9]*$/.test(values.srp)) {
			errors.srp = 'NPA IDI harus berupa angka';
		}

		console.log(errors);
		if (Object.keys(errors).length !== 0) {
			validated = false;
		} else {
			validated = true;
		}
		setDataError(errors);
		return validated;
	};

	// const handleOk = () => {
	// 	setPopup({
	// 		show: false,
	// 	});
	// 	navigate(-1);
	// };

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
			{loading && (<BackdropLoading/>)}
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
								sx={{ fontSize: 38, color: '#000000' }}
								onClick={handleBack}
							/>
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid>
					<Typography variant="h3" component="div">
						<strong>Edit Data Dokter</strong>
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
								<Grid item xs={12}>
									<FormInput
										title="Nama lengkap*"
										type="text"
										name="namadokter"
										value={editDataDokter.namadokter}
										onChange={handleChange}
									/>
									<Typography
										component="div"
										color={'red'}
										sx={{ marginLeft: 1 }}
									>
										{dataError.namadokter}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<FormInput
										title="NPA IDI*"
										type="text"
										name="srp"
										value={editDataDokter.srp}
										onChange={handleChange}
									/>
									<Typography
										component="div"
										color={'red'}
										sx={{ marginLeft: 1 }}
									>
										{dataError.srp}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<FormInput
										title="Spesialis*"
										type="text"
										name="spesialis"
										value={editDataDokter.spesialis}
										onChange={handleChange}
									/>
									<Typography
										component="div"
										color={'red'}
										sx={{ marginLeft: 1 }}
									>
										{dataError.spesialis}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<FormInput
										title="Username*"
										type="text"
										name="username"
										value={editDataDokter.username}
										onChange={handleChange}
									/>
									<Typography
										component="div"
										color={'red'}
										sx={{ marginLeft: 1 }}
									>
										{dataError.username}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<FormInput
										title="Kata Sandi Baru*"
										type="text"
										name="newPassword"
										value={editDataDokter.newPassword}
										onChange={handleChange}
									/>
									<Typography
										component="div"
										color={'red'}
										sx={{ marginLeft: 1 }}
									>
										{dataError.newPassword}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<FormInput
										title="Konfirmasi Kata Sandi Baru*"
										type="text"
										value={editDataDokter.confirmPassword}
										name="confirmPassword"
										onChange={handleChange}
									/>
									<Typography
										component="div"
										color={'red'}
										sx={{ marginLeft: 1 }}
									>
										{dataError.confirmPassword}
									</Typography>
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
										onClick={handleCancel}
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
