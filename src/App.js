import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://url-shortern-w20r.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullUrl }),
      });

      const data = await response.json();

      setShortUrls([...shortUrls, data]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">URL Shortern</h1>
      <form
        className="form-inline my-4"
        onSubmit={handleSubmit}
        action="/shortUrls"
        method="POST"
      >
       
        <input
          required
          placeholder="Url"
          type="url"
          name="fullUrl"
          id="fullUrl"
          className="form-control col mr-2"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
        />
        <button className="btn btn-success" type="submit">
          Shrink
        </button>
      </form>

      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {shortUrls.map((shortUrl, index) => (
            <tr key={index}>
              <td>
                <a href={shortUrl.full}>{shortUrl.full}</a>
              </td>
              <td>
                <a href={shortUrl.short}>{shortUrl.short}</a>
              </td>
              <td>{shortUrl.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
