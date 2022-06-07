import { Link } from 'react-router-dom';

import './Sidebar.css';

import app_icon from '../../assets/img/app_icon.svg';
import dashboard_icon from '../../assets/img/dashboard_icon.svg';
import data_pasien_icon from '../../assets/img/data_pasien_icon.svg';
import data_dokter_icon from '../../assets/img/data_dokter_icon.svg';
import kelola_jadwal_icon from '../../assets/img/kelola_jadwal_icon.svg';
import arsip_jadwal_icon from '../../assets/img/arsip_jadwal_icon.svg';
import logout_icon from '../../assets/img/logout_icon.svg';

const Sidebar = () => {
	return (
		<div className="container">
			<div className="icon">
				<img src={app_icon} alt="" />
				<div>
					<span style={{ color: '#358C56' }}>Puskesmas </span>
					<span style={{ color: '#4CA9EE' }}>Malaka</span>
				</div>

				<p>JAWA BARAT</p>
			</div>
			<div className="navigation_container">
				<ul>
					<Link to="/">
						<img src={dashboard_icon} alt="" />
						<li>Dashboard</li>
					</Link>

					<Link to="/data-pasien">
						<img src={data_pasien_icon} alt="" />
						<li>Data Pasien</li>
					</Link>

					<Link to="data_dokter">
						<img src={data_dokter_icon} alt="" />
						<li>Data Dokter</li>
					</Link>

					<Link to="kelola_jadwal">
						<img src={kelola_jadwal_icon} alt="" />
						<li>Kelola Jadwal</li>
					</Link>

					<Link to="arsip_jadwal">
						<img src={arsip_jadwal_icon} alt="" />
						<li>Arsip Jadwal</li>
					</Link>

					<hr />

					<Link to={'#'}>
						<img src={logout_icon} alt="" />
						<li>Logout</li>
					</Link>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
