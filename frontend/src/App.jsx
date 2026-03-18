import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVideo = async () => {
    if (!url) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/?url=${encodeURIComponent(url)}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch video");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>YouTube Downloader</h1>

      {/* Input */}
      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Paste YouTube URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />
        <button
            onClick={fetchVideo}
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.5 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
        >
          {loading ? "Loading..." : "Get Video"}
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Result */}
      {data && (
        <div style={styles.card}>
          <h2>{data.title}</h2>

          <img
            src={data.thumbnail}
            alt="thumbnail"
            style={styles.thumbnail}
          />

          <h3>Available Downloads</h3>

          <div style={styles.list}>
            {data.formats.map((f, index) => (
              <div key={index} style={styles.item}>
                <span>{f.resolution}p</span>

                <a href={f.url} target="_blank" rel="noreferrer">
                  <button style={styles.downloadBtn}>
                    Download
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

const styles = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
    padding: "40px",
  },
  inputBox: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "300px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 15px",
    cursor: "pointer",
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "inline-block",
  },
  thumbnail: {
    width: "300px",
    borderRadius: "10px",
  },
  list: {
    marginTop: "10px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
  },
  downloadBtn: {
    padding: "5px 10px",
    cursor: "pointer",
  },
};