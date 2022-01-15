import axios from "axios";

const countApi = axios.create({
  baseURL: "https://api.countapi.xyz/"
});

export { countApi }
