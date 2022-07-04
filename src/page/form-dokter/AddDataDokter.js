import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../../assets/sideFoto/foto-dokter.png";
import FormInput from "../../component/formInput/FormInput";
import { useNavigate } from "react-router-dom";
import axios from "../../API/api";
import Modal from "../../component/ModalNew/Modal";

export default function Form() {
  const formData = {
    username: "",
    password: "",
    namadokter: "",
    spesialis: "",
    srp: "",
  };

  let navigate = useNavigate();

  const [data, setData] = useState(formData);
  const [popup, setPopup] = useState({ show: false });

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate("/");
  };

  const endPoint = `dokter`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(endPoint, {
        username: data.username,
        password: data.password,
        namadokter: data.namadokter,
        spesialis: data.spesialis,
        srp: data.srp,
      })
      .then((res) => {
        setPopup({
          show: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOk = () => {
    setPopup({
      show: false,
    });
    navigate("/data-dokter");
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
                sx={{ fontSize: 60, color: "#000000" }}
                onClick={handleBack}
              />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid>
          <Typography variant="h3" component="div">
            <strong>Tambah Data Dokter</strong>
          </Typography>

          <Typography variant="h6" component="div">
            Registrasi untuk dokter baru.
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
                <Grid item xs={12}>
                  <FormInput
                    title="Namadokter lengkap*"
                    type="text"
                    value={data.namadokter}
                    name="namadokter"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="NPA IDI*"
                    type="text"
                    value={data.srp}
                    name="npa"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="Spesialis*"
                    type="text"
                    value={data.spesialis}
                    name="spesialis"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="Username*"
                    type="text"
                    value={data.username}
                    name="username"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="Password*"
                    type="text"
                    value={data.password}
                    name="password"
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
                    onClick={handleCancel}
                    sx={{
                      width: "160px",
                      height: "50px",
                      borderRadius: "20px",
                      fontSize: "16px",
                    }}
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
                  title={"Data Dokter Berhasil ditambahkan!"}
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
