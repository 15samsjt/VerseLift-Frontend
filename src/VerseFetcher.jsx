import React, { useState } from "react";
import axios from "axios";

export default function VerseFetcher() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userFeeling, setUserFeeling] = useState('');

  const API_URL = "https://verselift-backend.onrender.com";

  const getVerse = async () => {
    console.log("Feeling sent to backend:", userFeeling);

    setLoading(true);
    try {
    const response = await axios.get(
      `${API_URL}/verse?feeling=${encodeURIComponent(userFeeling)}`
    );
    setVerse(response.data);
  } catch (error) {
    console.error(error);
    setVerse({ text: "Failed to fetch verse." });
  }
  setLoading(false);
};

  return (
  <div style={{
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
    color: "#111",
  }}>
    <div style={{
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "420px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      textAlign: "center"
    }}>
      <h1 style={{ marginBottom: "10px" }}>
        How are you feeling today?
      </h1>

      <p style={{ color: "#666", marginBottom: "25px" }}>
        Share what’s on your heart, and receive a verse for today.
      </p>

      <input
        type="text"
        placeholder="e.g. anxious, grateful, tired…"
        value={userFeeling}
        onChange={(e) => setUserFeeling(e.target.value)}
        style={{
          padding: "12px",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginBottom: "16px",
          color: "#111",
          backgroundColor: "#fff",
        }}

      />

      <button
        onClick={getVerse}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#4f46e5",
          color: "white",
          cursor: "pointer"
        }}
      >
        {loading ? "Finding a verse..." : "Lift me with Scripture"}
      </button>

      {verse && (
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <hr style={{ marginBottom: "20px" }} />
          <h3>{verse.reference}</h3>
          <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#222" }}>
            {verse.text}
          </p>
          <small style={{ color: "#666" }}>
            {verse.translation}
          </small>
        </div>
      )}
    </div>
  </div>
);
}
