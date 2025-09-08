import React, { useState, useEffect, useRef } from 'react';
import parameter from '../../../img/simulate/parameter.svg';
// import SceneDialogCustom from './scene_luminance_custom';

const SceneFileDialog = ({ onSubmit, onClose, initialValues ={}, illuminantData, onIlluminantChange}) => {
  const [hfov, setHfov] = useState(initialValues?.hfov || 10);
  const [selectedIlluminant, setSelectedIlluminant] = useState(initialValues?.illuminant || '');
  const [isSceneLuminanceDialogOpen, setIsSceneLuminanceDialogOpen] = useState(false);

  const illuminants = ["", "Custom", "D50", "D55", "D65", "D75", "Illuminant A", "Illuminant B", "Illuminant C", "Fluorescent", "Tungsten"];
  const cursorRef = useRef(null);

  useEffect(()=>{
    if(initialValues.hfov !== undefined) setHfov(initialValues.hfov);
    if(initialValues.illuminant !== undefined) setSelectedIlluminant(initialValues.illuminant);
  }, [initialValues]);

  useEffect(() => {
    if (cursorRef.current) cursorRef.current.focus();
  }, []);

  // useEffect(() => {
  //   const handleEsc = (e) => { if (e.key === "Escape" && onClose) onClose(); };
  //   window.addEventListener("keydown", handleEsc);
  //   return () => window.removeEventListener("keydown", handleEsc);
  // }, [onClose]);

  useEffect(() => {
    const handleEsc = (e) => { 
      if (e.key === "Escape") {
        // HFoV와 Illuminant를 초기값으로 되돌리기
        if(initialValues.hfov !== undefined) setHfov(initialValues.hfov);
        if(initialValues.illuminant !== undefined) setSelectedIlluminant(initialValues.illuminant);


        if (onClose) onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, initialValues]);


  const handleSubmit = () => {
    if (onSubmit) onSubmit({hfov: Number(hfov), illuminant: selectedIlluminant});
    if (onClose) onClose();
  };

  const handleKeyPress = (e) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.dialog, width: '400px', backgroundColor: 'rgb(255, 255, 255)' }}>
        <h2 style={styles.title}>Scene File Parameters</h2>

        <div style={styles.inputRow}>
          <label style={styles.label}>HFoV (°)</label>
          <input
            ref={cursorRef}
            type="text"
            value={hfov}
            onChange={(e) => setHfov(e.target.value)}
            style={styles.input_hfov}
            placeholder=""
            onKeyDown={handleKeyPress}
          />
        </div>

        {/* <div style={styles.inputRow}>
          <label style={styles.label}>Scene Illuminant</label>
          <select
            value={selectedIlluminant}
            onChange={(e)=> setSelectedIlluminant(e.target.value)}
            style={styles.select}   // 새 스타일 사용
          >
            {illuminants.map((ill, idx) => <option key={idx}>{ill}</option>)}
          </select>
          <button style={{...iconButtonStyle, 
                          opacity: selectedIlluminant === 'Custom' ? 1 : 0.5, 
                          cursor: selectedIlluminant === 'Custom' ? "pointer" : "not-allowed"}} 
            onClick={() => {if(selectedIlluminant ==='Custom'){
              setIsSceneLuminanceDialogOpen(true)
            }}
            }>
            <img src={parameter} alt="Params" style={{ width: '20px', height: '20px' }} />
          </button>
        </div> */}

        {/* {isSceneLuminanceDialogOpen && (
          <SceneDialogCustom 
            initialData = {illuminantData}
            onSubmit={(data) => {
              if (data) {
                onIlluminantChange(data);
              }
            }}
            onClose={() => setIsSceneLuminanceDialogOpen(false)}
          />
        )} */}

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
    padding: '30px',
    borderRadius: '8px',
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
    color: '#000'
  },
  input_hfov: {
    width: '195px',
    padding: '5px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
    WebkitAppearance: 'none',
    MozAppearance: 'textfield'
  },
  select: {
    width: '150px',
    padding: '5px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#000',
    textAlign: 'left',     // 왼쪽 정렬
    appearance: 'auto',    // 화살표 표시
    WebkitAppearance: 'auto',
    MozAppearance: 'auto'
  },
  button: {
    padding: '6px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#008B8B',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
};

const iconButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '38px',
  height: '38px',
  minWidth: '30px',
  minHeight: '30px',
  padding: '0px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  background: '#fff',
  cursor: 'pointer',
  boxSizing: 'border-box',
  flexShrink: 0,
};

export default SceneFileDialog;
