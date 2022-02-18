import { baseUrl } from "./axiosInstanceJWT";
const axios = require("axios").default;

export default axios.create({
  baseURL: baseUrl,
});
