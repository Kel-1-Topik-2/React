import "./App.css";
import { Route, Routes } from "react-router-dom";
import AddData from "./page/form-admin/AddData";
import DetailData from "./page/form-admin/DetailData";
import EditData from "./page/form-admin/EditData";

function App() {
  return (
    <Routes>
      <Route path="/AddData" element={<AddData />} />
      <Route path="/DetailData" element={<DetailData />} />
      <Route path="/DetailData/EditData" element={<EditData />} />
    </Routes>
  );
}

export default App;
