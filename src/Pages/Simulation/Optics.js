import React, { useState } from 'react';

const OpticsDesign = () => {
  // Lens Table 상태
  const [lensTable, setLensTable] = useState([
    { surf: 0, radius: 'Infinity', thickness: 10, glass: 'AIR', semiDiameter: 25, conic: 0, comment: 'Object' },
  ]);

  // System Parameters 상태
  const [aperture, setAperture] = useState(25);
  const [field, setField] = useState(10);
  const [wavelength, setWavelength] = useState(550);

  // 테이블 값 업데이트
  const updateValue = (index, field, value) => {
    setLensTable((prev) => {
      const newTable = [...prev];
      newTable[index] = { ...newTable[index], [field]: value };
      return newTable;
    });
  };

  // 서피스 추가
  const addSurface = () => {
    if (lensTable.length < 30) {
      setLensTable([
        ...lensTable,
        {
          surf: lensTable.length,
          radius: 0,
          thickness: 1,
          glass: 'BK7',
          semiDiameter: 25,
          conic: 0,
          comment: '',
        },
      ]);
    }
  };

  // 서피스 삭제 (마지막 행 삭제)
  const deleteSurface = () => {
    if (lensTable.length > 1) {
      setLensTable(lensTable.slice(0, -1));
    }
  };

  // Ray Trace 실행 (placeholder)
  const runRayTrace = () => {
    alert('Ray Trace 실행');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        padding: '0px',
        boxSizing: 'border-box',
        gap: '1.5vh',
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
          alignItems: 'center',
        }}
      >
        {/* File / Project */}
        <button onClick={() => alert('New Lens')}>New Lens</button>
        <button onClick={() => alert('Open Lens')}>Open Lens</button>
        <button onClick={() => alert('Save Lens')}>Save Lens</button>

        {/* Lens Controls */}
        <button onClick={addSurface}>Add Surface</button>
        <button onClick={deleteSurface}>Delete Surface</button>

        {/* System Controls */}
        <button onClick={runRayTrace}>Run Ray Trace</button>
      </div>

      {/* 1행: Lens Table + System Parameters + Ray Trace */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          gap: '2%',
          minHeight: 0,
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        {/* 왼쪽: Lens Table + System Parameters */}
        <div
          style={{
            flex: '1 1 55%',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '12px',
            overflow: 'hidden',
            background: '#fff',
            minWidth: 0,
            gap: '10px',
          }}
        >
          <h3>Lens Prescription Table + System Parameters</h3>

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
              style={{ borderCollapse: 'collapse', width: '100%', fontSize: '14px' }}
            >
              <thead style={{ position: 'sticky', top: 0, background: '#f8f8f8' }}>
                <tr>
                  <th>Surf</th>
                  <th>Radius (mm)</th>
                  <th>Thickness (mm)</th>
                  <th>Glass</th>
                  <th>Semi-Dia (mm)</th>
                  <th>Conic</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {lensTable.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.surf}</td>
                    <td><input value={row.radius} onChange={(e) => updateValue(idx, 'radius', e.target.value)} style={{ width: '80px' }} /></td>
                    <td><input value={row.thickness} onChange={(e) => updateValue(idx, 'thickness', e.target.value)} style={{ width: '80px' }} /></td>
                    <td>
                      <select value={row.glass} onChange={(e) => updateValue(idx, 'glass', e.target.value)}>
                        <option>AIR</option>
                        <option>BK7</option>
                        <option>SF11</option>
                        <option>Fused Silica</option>
                      </select>
                    </td>
                    <td><input value={row.semiDiameter} onChange={(e) => updateValue(idx, 'semiDiameter', e.target.value)} style={{ width: '80px' }} /></td>
                    <td><input value={row.conic} onChange={(e) => updateValue(idx, 'conic', e.target.value)} style={{ width: '60px' }} /></td>
                    <td><input value={row.comment} onChange={(e) => updateValue(idx, 'comment', e.target.value)} style={{ width: '100%' }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* System Parameters */}
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <label>Aperture: </label>
              <input type="number" value={aperture} onChange={(e) => setAperture(e.target.value)} style={{ width: '60px' }} />
            </div>
            <div>
              <label>Field (°): </label>
              <input type="number" value={field} onChange={(e) => setField(e.target.value)} style={{ width: '60px' }} />
            </div>
            <div>
              <label>Wavelength (nm): </label>
              <input type="number" value={wavelength} onChange={(e) => setWavelength(e.target.value)} style={{ width: '80px' }} />
            </div>
          </div>
        </div>

        {/* 오른쪽: Ray Trace Preview */}
        <div
          style={{
            flex: '1 1 45%',
            border: '1px solid #ccc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafafa',
            color: '#888',
            minWidth: 0,
          }}
        >
          (Ray Trace Preview Placeholder)
        </div>
      </div>

      {/* 2행: Analysis Plot UI */}
      <div
        style={{
          flex: 1,
          width: '100%',
          borderTop: '1px solid #ddd',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
        }}
      >
        (Analysis Plots Placeholder: PSF, Wavefront, Field Curvature, Distortion 등)
      </div>
    </div>
  );
};

export default OpticsDesign;
