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
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../API/api";
import Modal from "../../component/ModalNew/Modal";

export default function Form() {
  let navigate = useNavigate();

  const location = useLocation();

  const [editDataDokter, setEditDataDokter] = useState({
    namadokter: location.state.namadokter,
    srp: location.state.srp,
    spesialis: location.state.spesialis,
    username: location.state.user.username,
    password: location.state.user.password,
    confirmpassword: "",
  });
  const [dataError, setDataError] = useState({});
  const [popup, setPopup] = useState({ show: false });

  const handleChange = (e) => {
    setEditDataDokter({
      ...editDataDokter,
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
    validate(editDataDokter);
    if (validate(editDataDokter) === true) {
      const newDataDokter = {
        namadokter: editDataDokter.namadokter,
        srp: editDataDokter.srp,
        spesialis: editDataDokter.spesialis,
      };
      const newDataUser = {
        username: editDataDokter.username,
        password: editDataDokter.password,
      };
      axios.put(`/dokter/${location.state.id}`, newDataDokter).then((res) => {
        axios.put(`/user/${location.state.id}`, newDataUser).then((res) => {
          setPopup({
            show: true,
          });
        });
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    let validated = false;
    if (!values.username) {
      errors.username = "username perlu dibutuhkan";
    } else if (values.username.length < 8) {
      errors.username = "username perlu 8 digit";
    }

    if (!values.password) {
      errors.password = "Kata Sandi perlu dibutuhkan";
    } else if (values.password.length < 8) {
      errors.password = "Kata Sandi perlu 8 digit";
    }

    if (!values.confirmpassword) {
      errors.confirmpassword = "Kata Sandi perlu dibutuhkan";
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "Konfirmasi password tidak sama";
    }

    if (!values.namadokter) {
      errors.namadokter = "nama dokter perlu dibutuhkan";
    }
    if (!values.spesialis) {
      errors.spesialis = "spesialis perlu dibutuhkan";
    }
    if (!values.srp) {
      errors.srp = "NPA IDI perlu dibutuhkan";
    } else if (values.srp.length < 6) {
      errors.srp = "NPA IDI minimal 6 karakter";
    }

    console.log(errors);
    if (Object.keys(errors).length !== 0) {
      validated = false;
    } else {
      validated = true;
    }
    setDataError(errors);
    return validated;
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
            <strong>Edit Data Dokter</strong>
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
                    title="Nama lengkap*"
                    type="text"
                    name="namadokter"
                    value={editDataDokter.namadokter}
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.namadokter}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="NPA IDI*"
                    type="text"
                    name="srp"
                    value={editDataDokter.srp}
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.srp}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="Spesialis*"
                    type="text"
                    name="spesialis"
                    value={editDataDokter.spesialis}
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.spesialis}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    title="Username*"
                    type="text"
                    name="username"
                    value={editDataDokter.username}
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.username}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="Kata Sandi Baru*"
                    type="text"
                    name="password"
                    value={editDataDokter.password}
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.password}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="Konfirmasi Kata Sandi Baru*"
                    type="text"
                    value={editDataDokter.confirmpassword}
                    name="confirmpassword"
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.confirmpassword}
                  </Typography>
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
                  title={"Data Dokter Berhasil diubah!"}
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
