import React, { useState, useEffect, useRef } from "react";

const QuantumEfficiencyDialog = ({ initialData, onClose, onSubmit }) => {
  const format5 = (v) => {
    const factor = 1e5;
    const truncated = Math.trunc(v * factor) / factor;
    return truncated.toFixed(5);
  };

  const [tableData, setTableData] = useState(
    initialData
      ? initialData.map(row => row.map(v => format5(v)))
      : Array.from({ length: 31 }, () => ["", "", ""])
  );

  const originalDataRef = useRef(
    initialData
      ? initialData.map(row => [...row])
      : Array.from({ length: 31 }, () => ["", "", ""])
  );

  const inputRefs = useRef(
    tableData.map(row => row.map(() => React.createRef()))
  );

  useEffect(() => {
    inputRefs.current[0][0]?.current?.focus();
  }, []);

  const handleChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  // ✅ QE value validation
  const validateQE = () => {
  for (let i = 0; i < tableData.length; i++) {
      for (let j = 0; j < tableData[i].length; j++) {
      const v = Number(tableData[i][j]);

      if (Number.isNaN(v)) {
          alert(`QE value is not a number. (${400 + i * 10} nm, ${["R", "G", "B"][j]})`);
          return false;
      }

      if (v < 0 || v > 1) {
          alert(`QE value must be between 0 and 1. (${400 + i * 10} nm, ${["R", "G", "B"][j]})`);
          return false;
      }
      }
  }
  return true;
  };

  const handleModify = () => {
    if (!validateQE()) return;

    // ✅ 숫자로 변환해서 전달 (중요)
    const numericQE = tableData.map(row => row.map(v => Number(v)));

    if (onSubmit) onSubmit(numericQE);
    if (onClose) onClose(numericQE);
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    const numRows = tableData.length;
    const numCols = tableData[0].length;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (rowIndex + 1 < numRows)
          inputRefs.current[rowIndex + 1][colIndex].current.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        if (rowIndex - 1 >= 0)
          inputRefs.current[rowIndex - 1][colIndex].current.focus();
        break;
      case "ArrowRight":
        e.preventDefault();
        if (colIndex + 1 < numCols)
          inputRefs.current[rowIndex][colIndex + 1].current.focus();
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (colIndex - 1 >= 0)
          inputRefs.current[rowIndex][colIndex - 1].current.focus();
        break;
      case "Enter":
        e.preventDefault();
        handleModify();
        break;
      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        setTableData(originalDataRef.current.map(row => [...row]));
        if (onClose) onClose(null);
        break;
      default:
        break;
    }
  };

  const verticalHeaders = Array.from(
    { length: 31 },
    (_, i) => `${400 + i * 10} nm`
  );

  const horizontalHeaders = ["R", "G", "B"];

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2 style={styles.title}>Quantum Efficiency</h2>

        <div style={{ maxHeight: "800px", overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={styles.th}></th>
                {horizontalHeaders.map((h, i) => (
                  <th key={i} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td style={{ ...styles.td, fontWeight: "bold" }}>
                    {verticalHeaders[rowIndex]}
                  </td>

                  {row.map((cell, colIndex) => (
                    <td key={colIndex} style={styles.td}>
                      <input
                        ref={inputRefs.current[rowIndex][colIndex]}
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          handleChange(rowIndex, colIndex, e.target.value)
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(e, rowIndex, colIndex)
                        }
                        style={styles.input}
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
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    width: "650px",
    maxHeight: "90vh",
    overflowY: "auto",
    textAlign: "center",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    color: "#000",
  },
  title: {
    margin: "0 0 20px 0",
    fontSize: "18px",
    fontWeight: "bold",
  },
  th: {
    border: "1px solid black",
    padding: "6px",
    backgroundColor: "#ccc",
  },
  td: {
    border: "1px solid black",
    padding: "4px",
  },
  input: {
    width: "100%",
    padding: "4px",
    borderRadius: "4px",
    border: "1px solid #aaa",
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    padding: "6px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#008B8B",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default QuantumEfficiencyDialog;
