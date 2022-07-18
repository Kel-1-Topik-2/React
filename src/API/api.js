import axios from "axios";

export default axios.create({
	baseURL: 'https://springboot-postgresql-capstone.herokuapp.com/',
});
