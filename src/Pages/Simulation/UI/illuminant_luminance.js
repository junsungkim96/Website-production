import React, { useState, useEffect, useRef} from 'react';

const IlluminantLuminanceDialog = ({ initialValue='', onSubmit, onClose }) => {
  const [luminance, setLuminance] = useState(initialValue);

  const cursorRef = useRef(null);
  
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.focus();
    }
  }, []);

  useEffect(()=>{
    setLuminance(initialValue);
  }, [initialValue]);

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
    if (onSubmit) onSubmit(luminance);
    if (onClose) onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.dialog, backgroundColor: 'rgb(255, 255, 255)' }}>
        <h2 style={styles.title}>Illuminant Luminance</h2>
        <div style={styles.inputRow}>
          <label style={styles.label}>
            Luminance (cd/m<sup>2</sup>)
          </label>
          <input
            ref={cursorRef}
            type="number"
            step="0.01"
            value={luminance}
            onChange={(e) => setLuminance(e.target.value)}
            onKeyDown={handleKeyPress}
            style={styles.input}
            placeholder=""
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
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  },
  dialog: {
    padding: '20px',
    borderRadius: '8px',
    width: '360px',
    textAlign: 'center',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
    color: '#000'
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  label: {
    color: '#000',
    flex: 1,
    textAlign: 'center'
  },
  input: {
    width: '150px',
    padding: '5px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
    WebkitAppearance: 'none',
    MozAppearance: 'textfield'
  },
  button: {
    padding: '6px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#008B8B',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default IlluminantLuminanceDialog;
