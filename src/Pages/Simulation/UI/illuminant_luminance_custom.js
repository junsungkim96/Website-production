import React, { useState, useEffect, useRef } from 'react';

const IlluminantDialogCustom = ({ initialData, onClose }) => {
  const [tableData, setTableData] = useState(
    initialData || Array.from({ length: 31 }, () => ["", ""])
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
    setTableData(newData);
  };

  const handleModify = () => {
    if (onClose){
      onClose(tableData);
    }
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
        if (onClose) onClose(null); // esc 눌렀을 때 다이얼로그 닫기
        break;
      default:
        break;
    }
  };


  const verticalHeaders = Array.from({ length: 31 }, (_, i) => `${400 + i*10} nm`);
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
