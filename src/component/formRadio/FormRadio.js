import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const FormRadio = ({ title, disable, onChange }) => {
  return (
    <FormControl disabled={disable}>
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        sx={{ color: "#358C56" }}
      >
        <strong>{title}</strong>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChange}
      >
        <FormControlLabel value="L" control={<Radio />} label="L" />
        <FormControlLabel value="P" control={<Radio />} label="P" />
      </RadioGroup>
    </FormControl>
  );
};

export default FormRadio;
