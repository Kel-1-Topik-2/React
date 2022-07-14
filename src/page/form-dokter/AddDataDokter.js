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
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../../assets/sideFoto/foto-dokter.png";
import FormInput from "../../component/formInput/FormInput";
import { useNavigate } from "react-router-dom";
import axios from "../../API/api";

export default function Form() {
  const formData = {
    username: "",
    password: "",
    confirmpassword: "",
    namadokter: "",
    spesialis: "",
    srp: "",
  };

  let navigate = useNavigate();

  const [data, setData] = useState(formData);
  const [dataError, setDataError] = useState({});

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate(data);
    if (validate(data) === true) {
      try {
        const respUser = await axios.post('/user', {
          username: data.username,
          password: data.password
        }, {
          headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (respUser.status === 200) {
          const respDokter = await axios.post('/dokter', {
            user_id: respUser.data.data.id,
            namadokter: data.namadokter,
            spesialis: data.spesialis,
            srp: data.srp
          }, {
            headers: {
              "content-type": "application/json",
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          });
          if (respDokter.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Sukses...',
              text: 'Data telah berhasil disimpan',
            }).then(() => {
              navigate("/data-dokter")
            })
          } else {
            return false;
          }
        } else{
          return false;
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Terjadi kesalahan',
        })
      }
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
    } else if (values.confirmpassword !== values.password){
      errors.confirmpassword = "Konfirmasi password tidak sama"
    }

    if (!values.namadokter) {
      errors.namadokter = "nama dokter perlu dibutuhkan";
    }
    if (!values.spesialis) {
      errors.spesialis = "spesialis perlu dibutuhkan";
    }
    if (!values.srp) {
      errors.srp = "NPA IDI perlu dibutuhkan";
    } else if (values.srp.length !== 6){
      errors.srp = "NPA IDI minimal 6 karakter"
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
                    title="Nama lengkap*"
                    type="text"
                    value={data.namadokter}
                    name="namadokter"
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
                    value={data.srp}
                    name="srp"
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
                    value={data.spesialis}
                    name="spesialis"
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
                    value={data.username}
                    name="username"
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
                    title="Kata Sandi*"
                    type="text"
                    value={data.password}
                    name="password"
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
                    title="Konfirmasi Kata Sandi*"
                    type="text"
                    value={data.confirmpassword}
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
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
