import axios from "axios";

export default axios.create({
	baseURL: 'https://springboot-postgresql-capstone.herokuapp.com/',
  headers: {
    "content-type": "application/json",
    'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
  }
});
