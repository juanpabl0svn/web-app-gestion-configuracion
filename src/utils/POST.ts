import axios from "axios";

export default function POST(endpoint: string, body?: any | null) {
  return axios.post("/api" + endpoint, body, {
    withCredentials: true,
  });
}
