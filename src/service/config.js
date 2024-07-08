import axios from "axios";

const http = axios.create({
  baseURL: "https://service.olimjanov.uz/v1",
});

http.interceptors.request.use(config => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    // config.headers["Authorization"] = `Bearer ${access_token}`;
    config.headers["Authorization"] = accessToken;
  }
  return config;
});
export default http;
