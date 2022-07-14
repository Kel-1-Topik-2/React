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
// import axios from "../../dummy-api/api";
import axios from "../../API/api";
import Modal from "../../component/ModalNew/Modal";

export default function Form() {
  const formData = {
    namapasien: "",
    nik: "",
    umur: 0,
    telp: "",
    alamat: "",
  };

  let navigate = useNavigate();

  const [data, setData] = useState(formData);
  const [dataError, setDataError] = useState({});
  const [radio, setRadio] = useState("Laki laki");
  const [popup, setPopup] = useState({ show: false });

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate("/data-pasien");
  };

  const endPoint = "pasien";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeRadio = (e) => {
    setRadio(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataError);
    validate(data);
    if (validate(data) === true) {
      axios
        .post(endPoint, {
          namapasien: data.namapasien,
          nik: data.nik,
          umur: data.umur,
          jeniskelamin: radio,
          telp: data.telp,
          alamat: data.alamat,
        }, {
          headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then((res) => {
          setPopup({
            show: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const validate = (values) => {
    const errors = {};
    let validated = false;
    if (!values.namapasien) {
      errors.namapasien = "nama pasien perlu dibutuhkan";
    }

    if (!values.nik) {
      errors.nik = "nik perlu dibutuhkan";
    } else if (values.nik.length < 16) {
      errors.nik = "nik perlu 16 digit";
    }

    if (values.umur <= 0) {
      errors.umur = "umur tidak sesuai";
    }
    if (!values.telp) {
      errors.telp = "nomor telpon perlu dibutuhkan";
    }
    if (!values.alamat) {
      errors.alamat = "alamat perlu dibutuhkan";
    }
    // if (!values.radio) {
    //   errors.radio = "silakan pilih jenis kelamin";
    // }

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
    navigate("/data-pasien");
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
                    value={data.namapasien}
                    name="namapasien"
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.namapasien}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <FormInput
                    title="Nomor Handphone*"
                    type="text"
                    value={data.telp}
                    name="telp"
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.telp}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="NIK*"
                    type="text"
                    value={data.nik}
                    name="nik"
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.nik}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <FormInput
                    title="Usia*"
                    type="number"
                    value={data.umur}
                    name="umur"
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.umur}
                  </Typography>
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
                      value={radio}
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
                    value={data.alamat}
                    name="alamat"
                    onChange={handleChange}
                  />
                  <Typography
                    component="div"
                    color={"red"}
                    sx={{ marginLeft: 1 }}
                  >
                    {dataError.alamat}
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
                  title={"Data Pasien Berhasil ditambahkan!"}
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
