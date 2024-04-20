import axios from "axios";
import { url } from "./config";

export default function POST(endpoint: string, body?: any | null) {

  return axios.post(url + endpoint, body, {
    withCredentials: true,
  });
}
