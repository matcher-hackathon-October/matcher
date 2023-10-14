import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://mock.apidog.com/m1/392795-0-default",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
