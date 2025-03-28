import React, { useState } from "react";

function App() {
  const [status, setStatus] = useState("unknown");

  // const startServer = async () => {
  //   const res = await fetch("http://127.0.0.1:5000/start", {
  //     method: "POST",
  //   });
  //   const data = await res.json();
  //   setStatus(data.status);
  // };

  const startServer = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/start", {
        method: "POST",
      });
      const data = await res.json();
      setStatus(data.status);
    } catch (error) {
      console.error("Start Server Error:", error);
      setStatus("error");
    }
  };
  

  const stopServer = async () => {
    const res = await fetch("http://127.0.0.1:5000/stop", {
      method: "POST",
    });
    const data = await res.json();
    setStatus(data.status);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>SFTP Server Dashboard</h1>
      <p><strong>Server status:</strong> {status}</p>
      <button onClick={startServer} style={{ marginRight: "10px" }}>
        Start Server
      </button>
      <button onClick={stopServer}>
        Stop Server
      </button>
    </div>
  );
}

export default App;
