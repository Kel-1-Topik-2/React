import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../../assets/sideFoto/foto.png";
import FormInput from "../../component/formInput/FormInput";
import { useNavigate } from "react-router-dom";
import axios from "../../dummy-api/api";

export default function Form() {
  const formData = {
    nama: "",
    nik: "",
    usia: 0,
    telp: "",
    alamat: "",
  };

  let navigate = useNavigate();

  const [data, setData] = useState(formData);
  const [radio, setRadio] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const endPoint = `Pasien`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(endPoint, {
        nama: data.nama,
        nik: data.nik,
        usia: data.usia,
        jk: radio,
        telp: data.telp,
        alamat: data.alamat,
      })
      .then((res) => {
        alert("Data telah ditambah");
        navigate("/data-pasien");
      })
      .catch((error) => {
        console.log(error);
      });
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
            <strong>Tambah Data Pasien</strong>
          </Typography>

          <Typography variant="h6" component="div">
            Registrasi untuk pasien baru.
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
                    value={data.nama}
                    name="nama"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormInput
                    title="Nomor Handphone*"
                    type="text"
                    value={data.telp}
                    name="telp"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="NIK*"
                    type="text"
                    value={data.nik}
                    name="nik"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormInput
                    title="Usia*"
                    type="number"
                    value={data.usia}
                    name="usia"
                    onChange={handleChange}
                  />
                </Grid>
                {/* Radio */}
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
                    >
                      <FormControlLabel
                        value="Laki-Laki"
                        control={<Radio />}
                        label="L"
                        onChange={(e) => {
                          setRadio(e.target.value);
                        }}
                      />
                      <FormControlLabel
                        value="Perempuan"
                        control={<Radio />}
                        label="P"
                        onChange={(e) => {
                          setRadio(e.target.value);
                        }}
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
                    value={data.alamat}
                    name="alamat"
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
