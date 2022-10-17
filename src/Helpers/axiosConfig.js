import axios from 'axios';

const axiosWithHeaders = axios.create({
  baseURL: 'http://localhost:3058',
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});

export default axiosWithHeaders;
