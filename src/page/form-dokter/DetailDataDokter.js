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
import Swal from "sweetalert2";
import BackdropLoading from "../../component/BackdropLoading/BackdropLoading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../../assets/sideFoto/foto-dokter.png";
import FormInput from "../../component/formInput/FormInput";
import { useLinkClickHandler, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import axios from "../../API/api";

export default function DetailData() {
  let navigate = useNavigate();
  const [detailDokter, setDetailDokter] = useState([]);
  const [userDokter, setUserDokter] = useState([]);

  const [loading, setLoading] = useState(false)

  const params = useParams();

  const handleEdit = useLinkClickHandler(
    `/detail-data-dokter/edit-data-dokter/${detailDokter.id}`,
    {
      state: detailDokter,
    }
  );
  const endPoint = `dokter/${params.id}`;

  useEffect(() => {
    const status = localStorage.getItem("token")
  
		if(status === null){
			navigate("/login", {replace: true})
		}
    else{
      setLoading(true)

      axios.get(endPoint, {
        headers: {
          "content-type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      }).then((res) => {
        setLoading(false)
        setDetailDokter(res.data.data);
        setUserDokter(res.data.data.user);
      }).catch((err) => {
        setLoading(false)
        if(err.response.status === 403){
          Swal.fire({
            icon: 'warning',
            title: 'Oops',
            text: 'Sesi anda sudah berakhir, silahkan login kembali',
          }).then(() => {
            localStorage.removeItem("token")
              navigate("/login")
          })
        }
      });
    }
  }, []);

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
      {loading && (<BackdropLoading/>)}
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
                    title="Nama lengkap*"
                    type="text"
                    disable
                    value={detailDokter.namadokter}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="NPA IDI*"
                    type="text"
                    disable
                    value={detailDokter.srp}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    title="Spesialis*"
                    type="text"
                    disable
                    value={detailDokter.spesialis}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    title="Username*"
                    type="text"
                    disable
                    value={userDokter.username}
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
