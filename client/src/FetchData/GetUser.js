import { useState, useEffect} from "react";


const GetUser = (url, reload) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not load data");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData(data.data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          setError(err.message);
        }
      });
    return () => abortCont.abort();
  }, [url, reload]);

  return { data, isLoading, error };
};

export default GetUser;
