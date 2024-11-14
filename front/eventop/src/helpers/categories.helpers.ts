import { useEffect, useState } from "react";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const useGetAllCategories = () => {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${APIURL}/categories`, {
            method: "GET"
        });
        const data = await res.json();
        setResult(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
      }
    })();
  }, []);

  return { result, loading, error };
};


  