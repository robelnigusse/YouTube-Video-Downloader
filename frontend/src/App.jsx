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
      const res = await fetch(`http://127.0.0.1:8000/?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error("Failed to fetch video data. Check your url.");
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Tube<span style={styles.titleAccent}>Fetch</span></h1>
          <p style={styles.subtitle}>Download your favorite YouTube videos in seconds</p>
        </header>

        {/* Search Section */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={fetchVideo}
            disabled={loading || !url}
            style={{
              ...styles.button,
              opacity: loading || !url ? 0.7 : 1,
              cursor: loading || !url ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Processing..." : "Analyze"}
          </button>
        </div>

        {/* Error Handling */}
        {error && <div style={styles.errorCard}>{error}</div>}

        {/* Result Card */}
        {data && (
          <div style={styles.card}>
            <img src={data.thumbnail} alt="thumbnail" style={styles.thumbnail} />
            <div style={styles.cardContent}>
              <h2 style={styles.videoTitle}>{data.title}</h2>
              <div style={styles.divider}></div>
              <p style={styles.label}>Available Resolutions:</p>
              <div style={styles.formatGrid}>
                {data.formats.map((f, index) => (
                  <div key={index} style={styles.formatRow}>
                    <span style={styles.resolutionTag}>{f.resolution}p</span>
                    <a href={f.url} target="_blank" rel="noreferrer" style={styles.downloadLink}>
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        

        
        <footer style={styles.footer}>
          <div style={styles.divider}></div>
          <p style={styles.devText}>Developed by <strong>Roba</strong></p>
          <div style={styles.socialLinks}>
            <a href="https://github.com/robelnigusse" target="_blank" rel="noreferrer" style={styles.socialIcon}>
              GitHub
            </a>
            <span style={styles.dot}>•</span>
            <a href="http://linkedin.com/in/robel-nigusse" target="_blank" rel="noreferrer" style={styles.socialIcon}>
              LinkedIn
            </a>
            <span style={styles.dot}>•</span>
            <a href="https://robel-nigusse.vercel.app" target="_blank" rel="noreferrer" style={styles.socialIcon}>
              Portfolio
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#212529",
    margin: 0,
  },
  titleAccent: {
    color: "#ff0000",
  },
  subtitle: {
    color: "#6c757d",
    marginTop: "10px",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
    backgroundColor: "#fff",
    padding: "8px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },
  input: {
    flex: 1,
    border: "none",
    padding: "12px 16px",
    fontSize: "1rem",
    outline: "none",
    borderRadius: "8px",
  },
  button: {
    backgroundColor: "#212529",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  errorCard: {
    backgroundColor: "#fff5f5",
    color: "#c92a2a",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    borderLeft: "4px solid #c92a2a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    animation: "fadeIn 0.5s ease-out",
  },
  thumbnail: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  cardContent: {
    padding: "24px",
  },
  videoTitle: {
    fontSize: "1.25rem",
    margin: "0 0 16px 0",
    color: "#212529",
    lineHeight: "1.4",
  },
  divider: {
    height: "1px",
    backgroundColor: "#eee",
    marginBottom: "20px",
  },
  label: {
    fontSize: "0.9rem",
    color: "#6c757d",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "bold",
    marginBottom: "12px",
  },
  formatGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  formatRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  resolutionTag: {
    fontWeight: "bold",
    color: "#495057",
  },
  downloadLink: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  footer: {
    marginTop: "50px",
    textAlign: "center",
    paddingBottom: "20px",
  },
  devText: {
    color: "#495057",
    fontSize: "0.95rem",
    marginBottom: "8px",
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  socialIcon: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: "600",
    transition: "color 0.2s",
  },
  dot: {
    color: "#ced4da",
    fontSize: "0.8rem",
  },
  divider: {
    height: "1px",
    backgroundColor: "#dee2e6",
    width: "100px",
    margin: "0 auto 20px auto",
  },
};