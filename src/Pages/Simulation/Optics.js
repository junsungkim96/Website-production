import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import { API_BASE_URL } from '../../config';

import newpage from '../../img/simulate/new-file.svg';
import run from '../../img/simulate/run.svg';
import save from '../../img/simulate/save.svg';
import back from '../../img/simulate/arrow-left.svg';
import forward from '../../img/simulate/arrow-right.svg';
import plus from '../../img/simulate/plus.svg';
import minus from '../../img/simulate/minus.svg';
import stop from '../../img/simulate/stop.svg';
import upload from '../../img/simulate/upload.svg';

const OpticsDesign = () => {
  const iconButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
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

  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [rayTracePreview, setRayTracePreview] = useState(null);
  const [psfPlot, setPsfPlot] = useState(null);
  const [wavefrontPlot, setWavefrontPlot] = useState(null);
  const [fieldPlot, setFieldPlot] = useState(null);

  const handleNewPage = () => {
    setLensTable([
      {
        surf: 1,
        type: 'Spherical',
        glass: 'AIR',
        radius_front: '',
        radius_back: '',
        thickness: '',
        semiDiameter: '',
        conic: '',
      },
    ]);
    setAperture(25);
    setField(10);
    setWavelength(550);
    setIsSimulationRunning(false);
    setPsfPlot(null);
    setWavefrontPlot(null);
    setFieldPlot(null);
    setRayTracePreview(null);
  };

  const [lensTable, setLensTable] = useState([
    {
      surf: 1,
      type: 'Spherical',
      glass: 'AIR',
      radius_front: '',
      radius_back: '',
      thickness: '',
      semiDiameter: '',
      conic: '',
    },
  ]);

  const [aperture, setAperture] = useState(25);
  const [field, setField] = useState(10);
  const [wavelength, setWavelength] = useState(550);

  const updateValue = (index, field, value) => {
    setLensTable((prev) => {
      const newTable = [...prev];
      newTable[index] = { ...newTable[index], [field]: value };
      return newTable;
    });
  };

  const addSurface = () => {
    if (lensTable.length < 30) {
      setLensTable([
        ...lensTable,
        {
          surf: lensTable.length + 1,
          type: 'Spherical',
          glass: 'BK7',
          radius_front: '',
          radius_back: '',
          thickness: '',
          semiDiameter: '',
          conic: '',
        },
      ]);
    }
  };

  const deleteSurface = () => {
    if (lensTable.length > 1) {
      setLensTable(lensTable.slice(0, -1));
    }
  };

  const runRayTrace = async () => {
    setIsSimulationRunning(true);

    setRayTracePreview(null);
    setPsfPlot(null);
    setWavefrontPlot(null);
    setFieldPlot(null);

    try {
      const payload = {lensTable};

      const response = await fetch(`${API_BASE_URL}/raytrace`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to run raytrace");

      const data = await response.json();

      // base64 이미지 바로 표시
      setRayTracePreview(
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={data.raytrace_img}
            alt="Ray Trace Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      );

      setPsfPlot(
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={data.psf_2d} // 백엔드에서 psf_2d를 base64로 전송함
            alt="PSF 2D Plot"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // 비율 유지하며 꽉 차게
            }}
          />
        </div>
      );

      // Wavefront / Field는 현재 placeholder
      setWavefrontPlot(<div>Wavefront data not implemented</div>);
      setFieldPlot(<div>Field curvature data not implemented</div>);
    } catch (err) {
      console.error("Raytrace failed:", err);
    } finally {
      setIsSimulationRunning(false);
    }
  };



  const runPSFAnalysis = () => alert('PSF Analysis 실행');
  const runWavefrontAnalysis = () => alert('Wavefront Analysis 실행');
  const runFieldAnalysis = () =>
    alert('Field Curvature / Distortion 분석 실행');

  const exportDesign = () => {
    const json = JSON.stringify(
      { lensTable, aperture, field, wavelength },
      null,
      2
    );
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lens_design.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '0px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Top Menu Bar */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          padding: '10px 20px',
          gap: '10px',
          background: '#f5f5f5',
          borderBottom: '1px solid #ccc',
          alignItems: 'center'
        }}
      >
        <button
          title="New"
          style={{
            ...iconButtonStyle,
            opacity: isSimulationRunning ? 0.5 : 1,
            cursor: isSimulationRunning ? 'not-allowed' : 'pointer',
          }}
          disabled={isSimulationRunning}
        >
          <img
            src={newpage}
            alt="New"
            style={{ width: 20, height: 20 }}
            onClick={handleNewPage}
          />
        </button>
        <button
          onClick={addSurface}
          title="Add Surface"
          style={{ ...iconButtonStyle, cursor: 'pointer' }}
        >
          <img src={plus} alt="Add" style={{ width: 20, height: 20 }} />
        </button>
        <button
          onClick={deleteSurface}
          title="Delete Surface"
          style={{ ...iconButtonStyle, cursor: 'pointer' }}
        >
          <img src={minus} alt="Delete" style={{ width: 20, height: 20 }} />
        </button>
        <button
          onClick={runRayTrace}
          title="Run"
          style={{ ...iconButtonStyle, 
                  opacity: isSimulationRunning ? 0.5 : 1,
                  cursor: isSimulationRunning ? "not-allowed" : "pointer"}}
          disabled={isSimulationRunning}
        >
          <img src={run} alt="Add" style={{ width: 20, height: 20 }} />
        </button>
        <button
          title="Stop"
          style={{ ...iconButtonStyle}}
        >
          <img src={stop} alt="Stop" style={{ width: 20, height: 20 }} />
        </button>
        {/* <button
          title="Save"
          style={{ ...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed' }}
        >
          <img src={save} alt="Save" style={{ width: 20, height: 20 }} />
        </button> */}
        <button
          style={{ ...iconButtonStyle}}
          title="Share"
        >
          <img src={upload} alt="Share" style={{ width: 20, height: 20 }} />
        </button>
      </div>

      {/* Lens Table + System Parameters */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          gap: '10px',
          minHeight: 0,
          padding: '12px 14px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: '1 1 55%',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            overflow: 'hidden',
            background: '#fff',
            minWidth: 0,
            overflow: 'hidden'
          }}
        >
          <h5 style={{ marginBottom: '6px' }}>Lens Data</h5>

          {/* Lens Table */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              minHeight: 0,
              border: '1px solid #eee',
              borderRadius: '6px',
              padding: '6px',
            }}
          >
            <table
              border="1"
              cellPadding="6"
              style={{
                borderCollapse: 'separate',
                borderSpacing: '0 0',
                width: '100%',
                fontSize: '14px',
                tableLayout: 'fixed',
              }}
            >
              <thead style={{ background: '#f8f8f8' }}>
                <tr>
                  <th style={{ width: '50px', padding: '6px 8px' }}>Surf</th>
                  <th style={{ width: '110px', padding: '6px 8px' }}>Type</th>
                  <th style={{ width: '120px', padding: '6px 8px 6px 20px' }}>Glass</th>
                  <th style={{ width: '100px', padding: '6px 8px' }}>Radius Front</th>
                  <th style={{ width: '100px', padding: '6px 8px' }}>Radius Back</th>
                  <th style={{ width: '100px', padding: '6px 8px' }}>Thickness</th>
                  <th style={{ width: '100px', padding: '6px 8px' }}>Semi-Diameter</th>
                  <th style={{ width: '80px', padding: '6px 8px' }}>Conic</th>
                </tr>
              </thead>
              <tbody>
                {lensTable.map((row, idx) => (
                  <tr key={idx}>
                    {/* Surf */}
                    <td style={{ padding: '4px 8px' }}>{row.surf}</td>

                    {/* Type */}
                    <td style={{ padding: '4px 8px' }}>
                      <select
                        value={row.type}
                        onChange={(e) => updateValue(idx, 'type', e.target.value)}
                        style={{ width: '110px', height: '28px' }}
                      >
                        <option value="Spherical">Spherical</option>
                        <option value="Plano">Plano</option>
                        <option value="Cylindrical">Cylindrical</option>
                        <option value="Aspheric">Aspheric</option>
                      </select>
                    </td>

                    {/* Glass */}
                    <td style={{ padding: '4px 8px 4px 20px' }}>
                      <select
                        value={row.glass}
                        onChange={(e) => updateValue(idx, 'glass', e.target.value)}
                        style={{ width: '100px', height: '28px' }}
                      >
                        <option value="AIR">AIR</option>
                        <option value="BK7">BK7</option>
                        <option value="N-BK7">N-BK7</option>
                        <option value="Fused Silica">Fused Silica</option>
                        <option value="CaF2">CaF2</option>
                        <option value="SF5">SF5</option>
                        <option value="SF6">SF6</option>
                        <option value="SF11">SF11</option>
                        <option value="S-LAH79">S-LAH79</option>
                        <option value="S-FPL53">S-FPL53</option>
                        <option value="ZnSe">ZnSe</option>
                        <option value="MgF2">MgF2</option>
                      </select>
                    </td>

                    {/* Radius Front */}
                    <td style={{ padding: '4px 8px' }}>
                      <input
                        value={row.radius_front}
                        onChange={(e) => updateValue(idx, 'radius_front', e.target.value)}
                        style={{ width: '80px', height: '28px' }}
                        // placeholder="Front"
                      />
                    </td>

                    {/* Radius Back */}
                    <td style={{ padding: '4px 8px' }}>
                      <input
                        value={row.radius_back}
                        onChange={(e) => updateValue(idx, 'radius_back', e.target.value)}
                        style={{ width: '80px', height: '28px' }}
                        // placeholder="Back"
                      />
                    </td>

                    {/* Thickness */}
                    <td style={{ padding: '4px 8px' }}>
                      <input
                        value={row.thickness}
                        onChange={(e) => updateValue(idx, 'thickness', e.target.value)}
                        style={{ width: '80px', height: '28px' }}
                      />
                    </td>

                    {/* Semi-Dia */}
                    <td style={{ padding: '4px 8px' }}>
                      <input
                        value={row.semiDiameter}
                        onChange={(e) => updateValue(idx, 'semiDiameter', e.target.value)}
                        style={{ width: '80px', height: '28px' }}
                      />
                    </td>

                    {/* Conic */}
                    <td style={{ padding: '4px 8px' }}>
                      <input
                        value={row.conic}
                        onChange={(e) => updateValue(idx, 'conic', e.target.value)}
                        style={{ width: '60px', height: '28px' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* System Parameters */}
          {/* <div
            style={{
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '6px 10px',
              background: '#fafafa',
              borderRadius: '6px',
              border: '1px solid #eee',
              fontSize: '13px',
            }}
          >
            <div>
              <label>Aperture: </label>
              <input
                type="number"
                value={aperture}
                onChange={(e) => setAperture(e.target.value)}
                style={{ width: '60px', marginLeft: '4px' }}
              />
            </div>

            <div>
              <label>Field (°): </label>
              <input
                type="number"
                value={field}
                onChange={(e) => setField(e.target.value)}
                style={{ width: '60px', marginLeft: '4px' }}
              />
            </div>

            <div>
              <label>Wavelength (nm): </label>
              <input
                type="number"
                value={wavelength}
                onChange={(e) => setWavelength(e.target.value)}
                style={{ width: '80px', marginLeft: '4px' }}
              />
            </div>
          </div> */}
        </div>

        {/* Lens Layout */}
        <div
          style={{
            flex: '1 1 45%',
            border: '1px solid #ccc',
            borderRadius: '8px',
            background: '#fff',
            minWidth: 0,
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <h5 style={{ margin: '4px 0 6px 4px' }}>Lens Layout</h5>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {rayTracePreview}
          </div>
        </div>
      </div>

      {/* Analysis Plots */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          width: '100%',
          borderTop: '1px solid #ddd',
          padding: '12px 14px',
          background: '#fff',
          flex: 1,
          boxSizing: 'border-box',
          flexShrink: 0,
          overflowY: 'auto',
        }}
      >
        {/* PSF Plot */}
        <div style={plotBoxStyle}>
          <h5 style={plotTitleRowStyle}>PSF Plot</h5>
          <div style={plotContentStyle}>{psfPlot}</div>
        </div>

        {/* Wavefront Map */}
        <div style={plotBoxStyle}>
          <h5 style={plotTitleRowStyle}>Wavefront Map</h5>
          <div style={plotContentStyle}>{wavefrontPlot}</div>
        </div>

        {/* Field Curvature */}
        <div style={plotBoxStyle}>
          <h5 style={plotTitleRowStyle}>Field Curvature / Distortion</h5>
          <div style={plotContentStyle}>{fieldPlot}</div>
        </div>
      </div>
    </div>
  );
};


// 공통 스타일
const plotBoxStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  background: '#fff',
  minHeight: '180px',
  display: 'flex',
  flexDirection: 'column',
  padding: '8px',
  overflow: 'hidden',
};

const plotTitleRowStyle = {
  margin: 0,
  marginBottom: '6px',
  fontSize: '14px',  // 너가 쓰던 크기 유지
  color: '#444',
  flexShrink: 0,
};

const plotContentStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  minHeight: 0, // grid 내부에서 필수
};

export default OpticsDesign;
