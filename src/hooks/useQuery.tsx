import POST from "@/utils/POST";
import { useState } from "react";

export default function useQuery() {
  const [queryInfo, setQueryInfo] = useState({
    loading: false,
    error: false,
    data: null,
  });

  const setQuery = async (query: string) => {
    setQueryInfo({ ...queryInfo, loading: true });
    try {
      const response = await POST(query);
      setQueryInfo({ ...queryInfo, loading: false, data: response.data });
    } catch (error) {
      setQueryInfo({ ...queryInfo, loading: false, error: true });
    }
  };

  return [setQuery, queryInfo.data, queryInfo.loading, queryInfo.error];
}
