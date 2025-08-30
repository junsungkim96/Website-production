import React, { useState, useEffect, useRef } from "react";

const SlantedEdgeDialog = ({ onSubmit, onClose, initialValues }) => {
  const [hfov, setHfov] = useState(initialValues?.hfov ?? 10);
  const [imageSize, setImageSize] = useState(initialValues?.imageSize ?? 128);
  const [edgeAngle, setEdgeAngle] = useState(initialValues?.edgeAngle ?? 2.6);
  const [darkLevel, setDarkLevel] = useState(initialValues?.darkLevel ?? 0);

  const cursorRef = useRef(null);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.focus();
    }
  }, []);

  // Update states if initialValues change
  useEffect(() => {
    if (initialValues) {
      setHfov(initialValues.hfov ?? 10);
      setImageSize(initialValues.imageSize ?? 128);
      setEdgeAngle(initialValues.edgeAngle ?? 2.6);
      setDarkLevel(initialValues.darkLevel ?? 0);
    }
  }, [initialValues]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (onClose) onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = () => {
    if (onSubmit) onSubmit({
      hfov: Number(hfov), 
      imageSize: Number(imageSize), 
      edgeAngle: Number(edgeAngle), 
      darkLevel: Number(darkLevel) 
    });
    if (onClose) onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.dialog, width: "360px", backgroundColor: "#fff" }}>
        <h2 style={styles.title}>Slanted Edge Parameters</h2>

        <div style={styles.inputRow}>
          <label style={styles.label}>HFoV (°)</label>
          <input
            ref={cursorRef}
            type="text"
            value={hfov}
            onChange={(e) => setHfov(e.target.value)}
            style={styles.input}
            placeholder=""
            onKeyDown={handleKeyPress}
          />
        </div>

        <div style={styles.inputRow}>
          <label style={styles.label}>Image size</label>
          <input
            type="text"
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value)}
            style={styles.input}
            placeholder=""
            onKeyDown={handleKeyPress}
          />
        </div>

        <div style={styles.inputRow}>
          <label style={styles.label}>Bar Slope</label>
          <input
            type="text"
            value={edgeAngle}
            onChange={(e) => setEdgeAngle(e.target.value)}
            style={styles.input}
            placeholder=""
            onKeyDown={handleKeyPress}
          />
        </div>

        <div style={styles.inputRow}>
          <label style={styles.label}>Dark Level</label>
          <input
            type="text"
            value={darkLevel}
            onChange={(e) => setDarkLevel(e.target.value)}
            style={styles.input}
            placeholder=""
            onKeyDown={handleKeyPress}
          />
        </div>

        <button onClick={handleSubmit} style={styles.button}>
          Modify
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  dialog: {
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    color: "#000",
  },
  title: {
    margin: "0 0 20px 0",
    fontSize: "18px",
    fontWeight: "bold",
  },
  inputRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  label: {
    color: "#000",
  },
  input: {
    width: "150px",
    padding: "5px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    textAlign: "center",
    backgroundColor: "#fff",
    color: "#000",
    WebkitAppearance: "none",
    MozAppearance: "textfield",
  },
  button: {
    padding: "6px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#008B8B",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default SlantedEdgeDialog;
