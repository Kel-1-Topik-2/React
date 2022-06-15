import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Dashboard from "./page/Dashboard/Dashboard";
import DataPasien from "./page/Data-pasien/DataPasien";
import DataDokter from "./page/Data-dokter/DataDokter";
import AddData from "./page/form-pasien/AddData";
import DetailData from "./page/form-pasien/DetailData";
import EditData from "./page/form-pasien/EditData";
import AddDataDokter from "./page/form-dokter/AddDataDokter";
import DetailDataDokter from "./page/form-dokter/DetailDataDokter";
import EditDataDokter from "./page/form-dokter/EditDataDokter";
import KelolaJadwal from "./page/Kelola-jadwal/KelolaJadwal";
import Login from './page/Login/Login';

function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Dashboard />} />
			<Route path="/data-pasien" element={<DataPasien />} />
			<Route path="/data-dokter" element={<DataDokter />} />


			<Route path="/add-data-pasien" element={<AddData />} />
			<Route path="/detail-data-pasien/:id" element={<DetailData />} />
			<Route
				path="/detail-data-pasien/edit-data-pasien/:id"
				element={<EditData />}
			/>
			<Route path="/add-data-dokter" element={<AddDataDokter />} />
			<Route path="/detail-data-dokter/:id" element={<DetailDataDokter />} />
			<Route
				path="/detail-data-dokter/edit-data-dokter/:id"
				element={<EditDataDokter />}
			/>
		</Routes>
	);

      <Route path="/add-data-pasien" element={<AddData />} />
      <Route path="/detail-data-pasien/:id" element={<DetailData />} />
      <Route
        path="/detail-data-pasien/edit-data-pasien/:id"
        element={<EditData />}
      />
      <Route path="/add-data-dokter" element={<AddDataDokter />} />
      <Route path="/detail-data-dokter/:id" element={<DetailDataDokter />} />
      <Route
        path="/detail-data-dokter/edit-data-dokter/:id"
        element={<EditDataDokter />}
      />

      <Route path="kelola-jadwal" element={<KelolaJadwal/>}/>
    </Routes>
  );
}

export default App;
