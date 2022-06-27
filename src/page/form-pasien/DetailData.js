import React, { useState, useEffect } from 'react';
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
import { useNavigate, useLinkClickHandler } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
// import api from '../../dummy-api/api';
import api from '../../API/api'
export default function DetailData() {
	let navigate = useNavigate();
	const [detailPasien, setDetailPasien] = useState([]);
	const params = useParams();
	const handleEdit = useLinkClickHandler(
		`/detail-data-pasien/edit-data-pasien/${detailPasien.id}`,
		{
			state: detailPasien,
		}
	);
	const endPoint = `pasien/${params.id}`;

	useEffect(() => {
		api.get(endPoint).then((res) => {
			setDetailPasien(res.data.data);
		});
	}, []);

	console.log(detailPasien);
	const handleBack = () => {
		navigate(-1);
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
								sx={{ fontSize: 38, color: '#000000' }}
								onClick={handleBack}
							/>
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid>
					<Typography variant="h3" component="div">
						<strong>Detail Data Pasien</strong>
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
						>
							<Grid
								container
								sx={{
									display: 'flex',
									justifyContent: 'end',
									marginBottom: 3,
								}}
							>
								<Button
									variant="contained"
									startIcon={<EditIcon />}
									sx={{
										borderRadius: '15px',
										fontSize: '14px',
										height: '40px',
									}}
									onClick={handleEdit}
								>
									<strong>Edit Profil</strong>
								</Button>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={7}>
									<FormInput
										title="Nama lengkap"
										type="text"
										disable
										value={detailPasien.namapasien}
									/>
								</Grid>
								<Grid item xs={5}>
									<FormInput
										title="Nomor Handphone"
										type="text"
										disable
										value={detailPasien.telp}
									/>
								</Grid>
								<Grid item xs={6}>
									<FormInput
										title="NIK"
										type="text"
										disable
										value={detailPasien.nik}
									/>
								</Grid>
								<Grid item xs={2}>
									<FormInput
										title="Usia"
										type="number"
										disable
										value={detailPasien.umur}
									/>
								</Grid>
								{/* Radio */}
								<Grid item xs={4}>
									<FormControl disabled>
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
										>
											<FormControlLabel
												value="Laki laki"
												control={<Radio />}
												label="L"
												checked={detailPasien.jeniskelamin === 'Laki laki'}
											/>
											<FormControlLabel
												value="Perempuan"
												control={<Radio />}
												label="P"
												checked={detailPasien.jeniskelamin === 'Perempuan'}
											/>
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<FormInput
										title="Alamat Rumah"
										type="text"
										multiline
										rows={3}
										disable
										value={detailPasien.alamat}
									/>
								</Grid>
							</Grid>
						</Box>
					</Paper>
				</Box>
			</Grid>
		</Grid>
	);
}
