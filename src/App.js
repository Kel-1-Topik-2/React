import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./page/Dashboard/Dashboard";
import DataPasien from "./page/Data-pasien/DataPasien";
import DetailPasient from "./page/Detail-Pasien/DetailPasient";
import AddData from "./page/form-admin/AddData";
import DetailData from "./page/form-admin/DetailData";
import EditData from "./page/form-admin/EditData";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/data-pasien" element={<DataPasien />} />
      <Route path="/data-pasien/detail" element={<DetailPasient />} />
      <Route path="/AddData" element={<AddData />} />
      <Route path="/DetailData" element={<DetailData />} />
      <Route path="/DetailData/EditData" element={<EditData />} />
    </Routes>
  );
}

export default App;
