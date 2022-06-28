import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../../assets/sideFoto/foto.png";
import FormInput from "../../component/formInput/FormInput";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../API/api";
import Modal from "../../component/ModalNew/Modal";

export default function Form() {
  let navigate = useNavigate();
  const location = useLocation();

  const [editDataPasien, setEditDataPasien] = useState({
    namapasien: location.state.namapasien,
    nik: location.state.nik,
    telp: location.state.telp,
    umur: location.state.umur,
    alamat: location.state.alamat,
  });

  const [editRadio, setEditRadio] = useState(location.state.jeniskelamin);
  const [popup, setPopup] = useState({ show: false });

  const handleChangeRadio = (e) => {
    setEditRadio(e.target.value);
  };

  useEffect(() => {
    console.log(editRadio);
  }, []);

  const handleChange = (e) => {
    setEditDataPasien({
      ...editDataPasien,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      namapasien: editDataPasien.namapasien,
      telp: editDataPasien.telp,
      nik: editDataPasien.nik,
      umur: editDataPasien.umur,
      jeniskelamin: editRadio,
      alamat: editDataPasien.alamat,
    };
    axios
      .put(`/pasien/${location.state.id}`, newData)
      .then((res) => {
        setPopup({
          show: true,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleOk = () => {
    setPopup({
      show: false,
    });
    navigate(-1);
  };

  const paperStyle = {
    padding: "30px 30px",
    margin: "50px auto",
    borderRadius: "20px",
  };

  const gridImage = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={4}
        style={gridImage}
        container
        direction="column"
        sx={{ padding: "40px" }}
      >
        <Grid item xs>
          <Tooltip title="back">
            <IconButton>
              <ArrowBackIcon
                sx={{ fontSize: 38, color: "#000000" }}
                onClick={handleBack}
              />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid>
          <Typography variant="h3" component="div">
            <strong>Edit Data Pasien</strong>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} md={8} sx={{ backgroundColor: "#EEEEEE" }}>
        <Box
          sx={{
            my: 4,
            mx: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper elevation={4} style={paperStyle}>
            <Box
              component="form"
              sx={{
                marginTop: 3,
                marginBottom: 3,
              }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <FormInput
                    title="Nama lengkap*"
                    type="text"
                    name="namapasien"
                    value={editDataPasien.namapasien}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormInput
                    title="Nomor Handphone*"
                    type="text"
                    name="telp"
                    value={editDataPasien.telp}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="NIK*"
                    type="text"
                    name="nik"
                    value={editDataPasien.nik}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormInput
                    title="Usia*"
                    type="number"
                    name="umur"
                    value={editDataPasien.umur}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      sx={{ color: "#358C56" }}
                    >
                      <strong>Jenis Kelamin</strong>
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={editRadio}
                      onChange={handleChangeRadio}
                    >
                      <FormControlLabel
                        value="Laki laki"
                        control={<Radio />}
                        label="L"
                      />
                      <FormControlLabel
                        value="Perempuan"
                        control={<Radio />}
                        label="P"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    title="Alamat Rumah*"
                    type="text"
                    multiline
                    rows={3}
                    name="alamat"
                    value={editDataPasien.alamat}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      width: "160px",
                      height: "50px",
                      borderRadius: "20px",
                      fontSize: "16px",
                    }}
                    onClick={handleCancel}
                  >
                    <strong>BATAL</strong>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      width: "160px",
                      height: "50px",
                      borderRadius: "20px",
                      fontSize: "16px",
                    }}
                  >
                    <strong>Simpan</strong>
                  </Button>
                </Grid>
              </Grid>
              {popup.show && (
                <Modal
                  title={"Data Pasien Berhasil diubah!"}
                  handleCancel={handleOk}
                />
              )}
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
