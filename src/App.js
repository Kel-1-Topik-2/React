import "./App.css";
import Homepage from "./page/Homepage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddData from "./page/form-admin/AddData";
import DetailData from "./page/form-admin/DetailData";
import EditData from "./page/form-admin/EditData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/AddData" element={<AddData />} />
        <Route path="/DetailData" element={<DetailData />} />
        <Route path="/DetailData/EditData" element={<EditData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
