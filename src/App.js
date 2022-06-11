import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Dashboard from "./page/Dashboard/Dashboard";
import DataPasien from "./page/Data-pasien/DataPasien";
import DataDokter from "./page/Data-dokter/DataDokter";
import AddData from "./page/form-admin/AddData";
import DetailData from "./page/form-admin/DetailData";
import EditData from "./page/form-admin/EditData";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/data-pasien" element={<DataPasien />} />
      <Route path="/data-dokter" element={<DataDokter />} />
      <Route path="/AddData" element={<AddData />} />
      <Route path="/DetailData/:id" element={<DetailData />} />
      <Route path="/DetailData/EditData/:id" element={<EditData />} />
    </Routes>
  );
}

export default App;
