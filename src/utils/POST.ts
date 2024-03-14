import axios from "axios";

export default function POST(endpoint: string, body?: any | null) {
  const url = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

  return axios.post(url + endpoint, body, {
    withCredentials: true,
  });
}
