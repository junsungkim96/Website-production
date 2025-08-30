import React, { useState, useEffect } from "react";

const SensorDialog = ({ onSubmit, onClose, initialValues }) => {
  const [inputs, setInputs] = useState({
    voltage_swing: "1.15",          // Voltage Swing (V)
    well_capacity: "9000",        // Well Capacity (e)
    fill_factor: "0.45",        // Fill Factor
    pixel_size: "2.2",         // Pixel Size (µm)
    dark_voltage: "10",          // Dark Voltage (µV/s)
    read_noise: "0.96",        // Read Noise (mV)
    prnu: "0.2218",      // PRNU (%)
    dsnu: "1",           // DSNU (mV)
    analog_gain: "1",           // Analog Gain
    analog_offset: "0",          // Analog Offset
    rows: "400",        // Rows
    cols: "600",        // Cols
  });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (onClose) onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(()=>{
    if(initialValues){
      setInputs((prev)=>({...prev, ...initialValues}))
    }
  }, [initialValues])

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
    if (onSubmit) onSubmit(inputs);
    if (onClose) onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2 style={styles.title}>Sensor Parameters</h2>
        <div style={styles.grid}>
          {labels.map(({ key, text }) => (
            <React.Fragment key={key}>
              <label style={styles.label}>{text}</label>
              <input
                type="text"
                value={inputs[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                style={styles.input}
                onKeyDown={handleKeyPress}
              />
            </React.Fragment>
          ))}
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
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "8px",
    width: "480px",
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
    alignSelf: "center",
  },
  input: {
    width: "100%",
    padding: "5px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#000",
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

export default SensorDialog;
