import axios from "axios";

export default axios.create({
	baseURL: 'https://springboot-postgresql-capstone.herokuapp.com/',
  headers: {
    "content-type": "application/json",
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwic3ViIjoic2FzYSJ9.7oeORU2oHYY_6ogO2Oiu0eEQ9YEmkC-mebW4HsA1qW4`
  }
});
