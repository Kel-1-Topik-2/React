import React from "react";
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
import image from "../../assets/sideFoto/foto.png";
import FormInput from "../../component/formInput/FormInput";
import FormRadio from "../../component/formRadio/FormRadio";
import { useNavigate } from "react-router-dom";

export default function Form() {
  let navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
                  <FormInput title="Nama lengkap*" type="text" />
                </Grid>
                <Grid item xs={5}>
                  <FormInput title="Nomor Handphone*" type="text" />
                </Grid>
                <Grid item xs={6}>
                  <FormInput title="NIK*" type="text" />
                </Grid>
                <Grid item xs={2}>
                  <FormInput title="Usia*" type="number" />
                </Grid>
                <Grid item xs={4}>
                  <FormRadio title="Jenis Kelamin*" />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    title="Alamat Rumah*"
                    type="text"
                    multiline
                    rows={3}
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
