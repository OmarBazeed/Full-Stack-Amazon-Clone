import axios from "axios";

const instatnce = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-28b89/us-central1/api",
});
export default instatnce;
