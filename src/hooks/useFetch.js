import { useState, useCallback } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async ({url, options = {}, customErrorMessage}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(customErrorMessage || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  return { fetchData, loading, error };
}

export default useFetch;