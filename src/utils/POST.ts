import axios from "axios";
import { URL } from "./config";

export default function POST(endpoint: string, body?: any | null) {
  return axios.post(URL + endpoint, body, {
    withCredentials: true,
  });
}
