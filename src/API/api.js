import axios from "axios";

export default axios.create({
	baseURL: 'https://springboot-postgresql-capstone.herokuapp.com/',
  headers: {
    "content-type": "application/json",
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwic3ViIjoic2FzYSJ9.pe1J8C3M1FWB4jDPHpkNq_dcvHSW7T6qePZA2l1kX0A`
  }
});
