import React, { useState } from 'react';

import axios from "../../API/api";

import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'

import style from './style.module.css';

import ButtonPrimary from '../../component/button-primary/ButtonPrimary';
import Checkbox from '@mui/material/Checkbox';

import showOff from '../../assets/img/showOff.svg';
import showOn from '../../assets/img/showOn.svg';
import banner from '../../assets/sideFoto/banner.png';

const Login = () => {

	const navigate = useNavigate()

	const [show, setShow] = useState(false);
	const [inputs, setInputs]  = useState({
		username: "",
		password: "",
		role: "ROLE_ADMIN"
	})

	const handleClickShow = () => {
		setShow((prevValue) => !prevValue);
	};

	const handleChange = (e) => {
		const newInput = {...inputs}
		newInput[e.target.name] = e.target.value

		setInputs(newInput)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		getToken()
	} 

	const getToken = () => {
		const endPoint = "api/auth/login"
		axios.post(endPoint, {...inputs})
		.then((res) => {
			localStorage.setItem("token", res.data.token)

			Swal.fire({
				icon: 'success',
				title: 'Sukses...',
				text: 'Berhasil login!',
			}).then(() => {
				navigate("/")
			})
		})
		.catch((err) => {
			console.log(err)

			Swal.fire({
				icon: 'error',
				title: 'Error...',
				text: 'Username atau password salah!',
			})
		})
	}

	return (
		<div className={style.container}>
			<div className={style.banner}>
				<img src={banner} alt="banner" />
			</div>
			<div className={style.containerForm}>
				<form onSubmit={handleSubmit}>
					<div className={style.title}>
						<h1>Selamat Datang Kembali!</h1>
						<p>Silahkan login untuk melanjutkan</p>
					</div>
					<div className="form">
						<div className={style.formInput}>
							<input
								type="text"
								name="username"
								placeholder="Username"
								className={style.input}
								value={inputs.username}
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>
						<div className={style.formInput}>
							<input
								type={show ? 'text' : 'password'}
								name="password"
								placeholder="Password"
								className={style.input}
								value={inputs.password}
								onChange={(e) => handleChange(e)}
								required
							/>
							<div className={style.icon} onClick={handleClickShow}>
								<img src={show ? showOn : showOff} alt="" width={'30px'} />
							</div>
						</div>
					</div>
					<div>
						<label htmlFor="">
							<Checkbox />
							Remember me
						</label>
					</div>
					<div
						style={{
							textAlign: 'center',
							marginTop: '70px',
						}}
					>
						<ButtonPrimary title={'Login'} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
