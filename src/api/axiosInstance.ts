import axios from "axios";


axios.defaults.baseURL = "https://660160fd87c91a11641ab523.mockapi.io/";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

const instance = axios.create({
  baseURL: "https://660160fd87c91a11641ab523.mockapi.io/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});



export default instance;
