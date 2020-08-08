import React, { useEffect } from "react";
import { useHttp } from "./hooks/http.hook";
// import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { request } = useHttp();
  //proxy fetch test
  useEffect(() => {
    async function fetchData() {
      const result = await request("api/test", "GET");

      console.log(result);
    }

    fetchData();
  }, [request]);

  return <h1>bruh</h1>;
}

export default App;
