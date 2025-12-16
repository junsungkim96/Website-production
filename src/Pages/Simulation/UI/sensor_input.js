import React, { useState, useEffect } from "react";
import QuantumEfficiencyDialog from "./sensor_qe.js";
import spectrum from '../../../img/simulate/spectrum.svg';
import SpectrumPlot from './qe_plot.js';

const SensorDialog = ({ onSubmit, onClose, initialValues }) => {
  const [inputs, setInputs] = useState({
    voltage_swing: "1.15",
    well_capacity: "9000",
    fill_factor: "0.45",
    pixel_size: "2.2",
    dark_voltage: "10",
    read_noise: "0.96",
    prnu: "0.22",
    dsnu: "1",
    analog_gain: "1",
    analog_offset: "0",
    rows: "400",
    cols: "600",
  });

  const [showQEDialog, setShowQEDialog] = useState(false);
  const [qeData, setQeData] = useState(null);

  // ✅ ESC + ENTER 처리 (포커스 불필요)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (showQEDialog) setShowQEDialog(false);
        else if (onClose) onClose();
      }

      if (e.key === "Enter" && !showQEDialog) {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showQEDialog, onClose, inputs, qeData]);

  useEffect(() => {
    if (!initialValues) return;

    const { qe, ...rest } = initialValues;

    setInputs((prev) => ({
      ...prev,
      ...rest,
    }));

    if (Array.isArray(qe)) {
      setQeData(qe.map(row => [...row]));
    }
  }, [initialValues]);

  const labels = [
    { key: "voltage_swing", text: "Voltage Swing (V)" },
    { key: "well_capacity", text: "Well Capacity (e)" },
    { key: "fill_factor", text: "Fill Factor" },
    { key: "pixel_size", text: "Pixel Size (µm)" },
    { key: "dark_voltage", text: "Dark Voltage (µV/s)" },
    { key: "read_noise", text: "Read Noise (mV)" },
    { key: "prnu", text: "PRNU (%)" },
    { key: "dsnu", text: "DSNU (mV)" },
    { key: "analog_gain", text: "Analog Gain" },
    { key: "analog_offset", text: "Analog Offset" },
    { key: "rows", text: "Rows" },
    { key: "cols", text: "Cols" },
  ];

  const handleChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        ...inputs,
        qe: qeData.map(row => row.map(v => Number(v))),
      });
    }
    if (onClose) onClose();
  };

  const openQESpectrumPlot = () => {
    if (!qeData) return;

    const wavelength = Array.from({ length: 31 }, (_, i) => 400 + i * 10);
    const R = qeData.map(v => v[0]);
    const G = qeData.map(v => v[1]);
    const B = qeData.map(v => v[2]);

    SpectrumPlot(wavelength, { R, G, B });
  };

  return (
    <>
      <div style={styles.overlay}>
        <div style={styles.dialog}>
          <h2 style={styles.title}>Sensor Parameters</h2>

          <div style={styles.grid}>
            <label style={styles.label}>Quantum Efficiency</label>
            <div style={styles.qeRow}>
              <button
                style={styles.qeButton}
                onClick={() => setShowQEDialog(true)}
              >
                Edit
              </button>
              <button
                style={styles.iconButtonStyle}
                onClick={openQESpectrumPlot}
                id="QE-plot"
                title="QE"
              >
                <img
                  src={spectrum}
                  alt="Spectrum"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </div>

            {labels.map(({ key, text }) => (
              <React.Fragment key={key}>
                <label style={styles.label}>{text}</label>
                <input
                  type="text"
                  value={inputs[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  style={styles.input}
                />
              </React.Fragment>
            ))}
          </div>

          <button onClick={handleSubmit} style={styles.button}>
            Modify
          </button>
        </div>
      </div>

      {showQEDialog && (
        <QuantumEfficiencyDialog
          initialData={qeData}
          onSubmit={(data) => setQeData(data)}
          onClose={() => setShowQEDialog(false)}
        />
      )}
    </>
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
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "8px",
    width: "520px",
    textAlign: "center",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    color: "#000",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  title: {
    margin: "0 0 20px 0",
    fontSize: "20px",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "10px 15px",
    marginBottom: "20px",
    alignItems: "center",
  },
  label: {
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "5px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#000",
    boxSizing: "border-box",
  },
  qeRow: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "left",
  },
  qeButton: {
    padding: "5px 15px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#555",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    whiteSpace: "nowrap",
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
  iconButtonStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    minWidth: '30px',
    minHeight: '30px',
    padding: '0px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: '#fff',
    cursor: 'pointer',
    boxSizing: 'border-box',
    flexShrink: 0,
  },
};

export default SensorDialog;
