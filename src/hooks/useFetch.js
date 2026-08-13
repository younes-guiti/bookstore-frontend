import { useEffect, useState } from "react";

function useFetch(fetchFunction) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [fetchFunction]);

  return {
    data,
    loading,
    error,
  };
}

export default useFetch;