import React, { useState, useEffect } from "react";
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
import { useLinkClickHandler, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import axios from "../../dummy-api/api";

export default function DetailData() {
  let navigate = useNavigate();
  const [detailDokter, setDetailDokter] = useState([]);

  const params = useParams();

  const handleEdit = useLinkClickHandler(
    `/detail-data-dokter/edit-data-dokter/${detailDokter.idDokter}`,
    {
      state: detailDokter,
    }
  );
  const endPoint = `Dokter/${params.id}`;

  useEffect(() => {
    axios.get(endPoint).then((res) => {
      setDetailDokter(res.data);
    });
  }, []);

  console.log(detailDokter);
  const handleBack = () => {
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
            <strong>Detail Data Dokter</strong>
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
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginBottom: 3,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{
                    borderRadius: "15px",
                    fontSize: "14px",
                    height: "40px",
                  }}
                  onClick={handleEdit}
                >
                  <strong>Edit Profil</strong>
                </Button>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormInput
                    title="Nama lengkap"
                    type="text"
                    disable
                    value={detailDokter.nama}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="NPA IDI"
                    type="text"
                    disable
                    value={detailDokter.npa}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="Spesialis"
                    type="text"
                    disable
                    value={detailDokter.spesialis}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="Username"
                    type="text"
                    disable
                    value={detailDokter.userName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="Password"
                    type="text"
                    disable
                    value={detailDokter.password}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
