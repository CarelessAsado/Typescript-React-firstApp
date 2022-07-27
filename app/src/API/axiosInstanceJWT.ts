import { BACKEND_ROOT } from "config/constants";

const axios = require("axios").default;

export default axios.create({
  baseURL: BACKEND_ROOT,
  headers: {
    "auth-token": "",
  },
});
