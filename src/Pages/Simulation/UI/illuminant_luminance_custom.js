import React, { useState, useEffect, useRef } from 'react';

const h = 6.62607015e-34; // Planck's constant [J sec]
const c = 299792458;      // Speed of light [m/s]

// 1D 또는 2D 배열 대응
const quantaToEnergy = ({ wavelength, photons }) => {
  if (!photons || photons.length === 0) return [];

  const numWaves = wavelength.length;
  const energy = [];

  if (Array.isArray(photons[0])) {
    // 2D XW format
    for (let i = 0; i < photons.length; i++) {
      energy[i] = [];
      for (let j = 0; j < numWaves; j++) {
        energy[i][j] = (h * c / (wavelength[j] * 1e-9)) * photons[i][j];
      }
    }
  } else {
    // 1D array
    for (let j = 0; j < numWaves; j++) {
      energy[j] = (h * c / (wavelength[j] * 1e-9)) * photons[j];
    }
  }

  return energy;
};

const energyToQuanta = ({ wavelength, energy }) => {
  if (!energy || energy.length === 0) return [];

  const numWaves = wavelength.length;
  const photons = [];

  if (Array.isArray(energy[0])) {
    // 2D XW format
    for (let i = 0; i < energy.length; i++) {
      photons[i] = [];
      for (let j = 0; j < numWaves; j++) {
        photons[i][j] = energy[i][j] * (wavelength[j] * 1e-9) / (h * c);
      }
    }
  } else {
    // 1D array
    for (let j = 0; j < numWaves; j++) {
      photons[j] = energy[j] * (wavelength[j] * 1e-9) / (h * c);
    }
  }

  return photons;
};

const IlluminantDialogCustom = ({ initialData, onClose, onSubmit }) => {
  // deep copy로 초기값 저장
  const [tableData, setTableData] = useState(
    initialData ? initialData.map(row => [...row]) : Array.from({ length: 31 }, () => ["", ""])
  );

  const originalDataRef = useRef(
    initialData ? initialData.map(row => [...row]) : Array.from({ length: 31 }, () => ["", ""])
  );

  // 2D 배열로 ref 생성
  const inputRefs = useRef(tableData.map(row => row.map(() => React.createRef())));

  useEffect(() => {
    if (inputRefs.current[0][0].current) {
      inputRefs.current[0][0].current.focus();
    }
  }, []);

  const handleChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;

    const wave = [400 + rowIndex * 10]; // 배열로 감싸기

    try {
      if (colIndex === 0) { // photon 입력
        if (value === "" || isNaN(parseFloat(value))) {
          newData[rowIndex][1] = ""; // energy 빈칸 유지
        } else {
          const photonVal = [parseFloat(value) * 1e20];
          const energy = quantaToEnergy({ wavelength: wave, photons: photonVal });
          newData[rowIndex][1] = energy[0].toFixed(6);
        }
      } else if (colIndex === 1) { // energy 입력
        if (value === "" || isNaN(parseFloat(value))) {
          newData[rowIndex][0] = ""; // photon 빈칸 유지
        } else {
          const energyVal = [[parseFloat(value)]];
          const photon = energyToQuanta({ wavelength: wave, energy: energyVal });
          newData[rowIndex][0] = (photon[0][0] / 1e20).toFixed(6);
        }
      }
    } catch (err) {
      if (colIndex === 0) newData[rowIndex][1] = "";
      else newData[rowIndex][0] = "";
    }

    setTableData(newData);
  };

  const handleModify = () => {
    if (onSubmit) onSubmit(tableData);
    if (onClose) onClose(tableData);
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    const numRows = tableData.length;
    const numCols = tableData[0].length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (rowIndex + 1 < numRows) inputRefs.current[rowIndex + 1][colIndex].current.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (rowIndex - 1 >= 0) inputRefs.current[rowIndex - 1][colIndex].current.focus();
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (colIndex + 1 < numCols) inputRefs.current[rowIndex][colIndex + 1].current.focus();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (colIndex - 1 >= 0) inputRefs.current[rowIndex][colIndex - 1].current.focus();
        break;
      case 'Enter':
        e.preventDefault();
        handleModify();
        break;
      case 'Escape':
        e.preventDefault();
        setTableData(originalDataRef.current.map(row=> [...row]));
        if (onClose) onClose(null);
        break;
      default:
        break;
    }
  };

  const verticalHeaders = Array.from({ length: 31 }, (_, i) => `${400 + i * 10} nm`);
  const horizontalHeaders = ["Photons (10^20)", "Energy (J)"];

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2 style={styles.title}>Illuminant Luminance</h2>
        <div style={{ maxHeight: '800px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={styles.th}></th>
                {horizontalHeaders.map((header, idx) => (
                  <th key={idx} style={styles.th}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td style={{ ...styles.td, textAlign: 'center', fontWeight: 'bold' }}>
                    {verticalHeaders[rowIndex]}
                  </td>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} style={styles.td}>
                      <input
                        ref={inputRefs.current[rowIndex][colIndex]}
                        type="text"
                        value={cell}
                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                        style={styles.input}
                        onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleModify} style={styles.button}>
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
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    width: '650px',
    maxHeight: '90vh',
    overflowY: 'auto',
    textAlign: 'center',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
    color: '#000'
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  th: {
    border: '1px solid black',
    padding: '5px',
    backgroundColor: '#ccc',
    textAlign: 'center'
  },
  td: {
    border: '1px solid black',
    padding: '5px',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: '4px',
    borderRadius: '4px',
    border: '1px solid #aaa',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  button: {
    marginTop: '20px',
    padding: '6px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#008B8B',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default IlluminantDialogCustom;
