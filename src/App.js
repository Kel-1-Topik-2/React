import { Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./page/Dashboard/Dashboard";
import DataPasien from "./page/Data-pasien/DataPasien";
import DetailPasient from "./page/Detail-Pasien/DetailPasient";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/data-pasien" element={<DataPasien />} />
      <Route path="/data-pasien/detail" element={<DetailPasient />} />
    </Routes>
  );
}

export default App;
