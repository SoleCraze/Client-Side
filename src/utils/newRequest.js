import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://54.179.21.25/api/",
  withCredentials: true,
});

export default newRequest;