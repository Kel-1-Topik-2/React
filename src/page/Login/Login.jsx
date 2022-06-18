import React, { useState } from 'react';
import banner from '../../assets/sideFoto/banner.png';
import style from './style.module.css';
import ButtonPrimary from '../../component/button-primary/ButtonPrimary';
import Checkbox from '@mui/material/Checkbox';
import showOff from '../../assets/img/showOff.svg';
import showOn from '../../assets/img/showOn.svg';

const Login = () => {
	const [show, setShow] = useState(false);

	const handleClickShow = () => {
		setShow((prevValue) => !prevValue);
	};

	return (
		<div className={style.container}>
			<div className={style.banner}>
				<img src={banner} alt="banner" />
			</div>
			<div className={style.containerForm}>
				<div>
					<div className={style.title}>
						<h1>Selamat Datang Kembali!</h1>
						<p>Silahkan login untuk melanjutkan</p>
					</div>
					<select name="role" className={style.containerDropdown}>
						<option selected className={style.dropdown}>
							Pilih role
						</option>
						<option value="admin" className={style.dropdown}>
							Admin
						</option>
						<option value="dokter" className={style.dropdown}>
							Dokter
						</option>
					</select>
					<div className="form">
						<div className={style.formInput}>
							<input
								type="text"
								name="username"
								placeholder="Username"
								className={style.input}
							/>
						</div>
						<div className={style.formInput}>
							<input
								type={show ? 'text' : 'password'}
								name="password"
								placeholder="Password"
								className={style.input}
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
				</div>
			</div>
		</div>
	);
};

export default Login;
