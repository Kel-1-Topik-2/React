import React from "react";
import { FormControl, FormLabel, OutlinedInput } from "@mui/material";

const TextForm = ({
  title,
  type,
  multiline,
  rows,
  disable,
  value,
  onChange,
  name,
  required,
}) => {
  return (
    <FormControl fullWidth >
      <FormLabel sx={{ color: "#358C56" }}>
        <strong>{title}</strong>
      </FormLabel>
      <OutlinedInput disabled={disable}
        sx={{
          borderRadius: "20px",
          backgroundColor: "#EEEEEE",
          color: '#000000',
          fontWeight: '400',
          fontSize: '20px',
          fontFamily: 'Poppins'
        }}
        type={type}
        multiline={multiline}
        rows={rows}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
    </FormControl>
  );
};

export default TextForm;
