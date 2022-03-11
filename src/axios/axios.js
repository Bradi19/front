import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "X-Token-Base64": MD5("test") },
});
console.log(MD5("test"));
export default instance;
