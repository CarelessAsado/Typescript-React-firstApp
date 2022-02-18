const axios = require("axios").default;
export const baseUrl =
  "https://typescript-backend-reactnode.herokuapp.com/api/v1";
export default axios.create({
  baseURL: baseUrl,
  headers: {
    "auth-token": "",
  },
});
