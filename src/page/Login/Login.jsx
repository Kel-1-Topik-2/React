import React, { useState } from "react";
import banner from "../../assets/sideFoto/banner.png";
import style from "./style.module.css";
import ButtonPrimary from "../../component/button-primary/ButtonPrimary";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const handleTogglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={style.container}>
      <div className={style.banner}>
        <img src={banner} alt="banner" />
      </div>
      <div className={style.containerForm}>
        <div>
          <div className={style.title}>
            <h1>Selamat Datang Kembali!</h1>
            <p>Silahkan login untuk melanjutkan</p>
          </div>
          <select name="role" className={style.containerDropdown}>
            <option selected className={style.dropdown}>
              Pilih role
            </option>
            <option value="admin" className={style.dropdown}>
              Admin
            </option>
            <option value="dokter" className={style.dropdown}>
              Dokter
            </option>
          </select>
          <div>
            <input type="text" placeholder="Username" className={style.input} />
          </div>
          <div>
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              className={style.input}
            />
            <IconButton onClick={handleTogglePassword}>
              {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <ButtonPrimary title={"Login"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
