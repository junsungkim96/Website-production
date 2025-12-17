import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import { API_BASE_URL } from '../../config';

import newpage from '../../img/simulate/new-file.svg';
// import run from '../../img/simulate/run.svg';
// import save from '../../img/simulate/save.svg';
// import back from '../../img/simulate/arrow-left.svg';
// import forward from '../../img/simulate/arrow-right.svg';
import plus from '../../img/simulate/plus.svg';
import minus from '../../img/simulate/minus.svg';
// import stop from '../../img/simulate/stop.svg';
import upload from '../../img/simulate/upload.svg';
import lens from '../../img/simulate/lens.png';
import raytrace from '../../img/simulate/optics.png';
import analytics from '../../img/simulate/analytics.png';

const OpticsDesign = ({preset, onPresetConsumed}) => {
  const DOUBLE_GAUSS_PRESET = [
    // 0 Object
    { surf: 0, type: 'Object', curvature: 0.0, thickness: Infinity, material: 'AIR', clearAperture: Infinity },

    // Lens 1
    { surf: 1, type: 'Refractive', curvature: 75.05, thickness: 9.0, material: 'BK7', clearAperture: 33.0 },
    { surf: 2, type: 'Refractive', curvature: 270.7, thickness: 0.1, material: 'AIR', clearAperture: 33.0 },

    // Lens 2
    { surf: 3, type: 'Refractive', curvature: 39.27, thickness: 16.51, material: 'BK7', clearAperture: 27.5 },
    { surf: 4, type: 'Refractive', curvature: 0.0, thickness: 0.1, material: 'AIR', clearAperture: 27.5 },

    // Lens 3
    { surf: 5, type: 'Refractive', curvature: 0.0, thickness: 2.0, material: 'BK7', clearAperture: 24.5 },
    { surf: 6, type: 'Refractive', curvature: 25.65, thickness: 10.99, material: 'AIR', clearAperture: 19.5 },

    // Stop
    { surf: 7, type: 'Stop', curvature: 0.0, thickness: 13.0, material: 'AIR', clearAperture: 18.0 },

    // Lens 4
    { surf: 8, type: 'Refractive', curvature: -31.87, thickness: 7.03, material: 'BK7', clearAperture: 16.5 },
    { surf: 9, type: 'Refractive', curvature: 0.0, thickness: 0.1, material: 'AIR', clearAperture: 18.5 },

    // Lens 5
    { surf: 10, type: 'Refractive', curvature: 0.0, thickness: 8.98, material: 'BK7', clearAperture: 21.0 },
    { surf: 11, type: 'Refractive', curvature: -43.51, thickness: 0.1, material: 'AIR', clearAperture: 21.0 },

    // Lens 6
    { surf: 12, type: 'Refractive', curvature: 221.14, thickness: 7.98, material: 'BK7', clearAperture: 23.0 },
    { surf: 13, type: 'Refractive', curvature: -88.79, thickness: 61.42, material: 'AIR', clearAperture: 23.0 },

    // Image
    { surf: 14, type: 'Image', curvature: 0.0, thickness: 0.0, material: 'AIR', clearAperture: Infinity },
  ];

  useEffect(() => {
    if (preset === 'DOUBLE_GAUSS') {
      setLensTable(DOUBLE_GAUSS_PRESET);
      onPresetConsumed?.();
    }
  }, [preset, onPresetConsumed]);


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

  const [lensTable, setLensTable] = useState([
    {
      surf: 0,
      type: 'Object',        // Object로 prefill
      curvature: '0',
      thickness: Infinity,   // Object는 두께 Infinity 가능
      material: 'AIR',       // Object는 AIR
      clearAperture: Infinity,
    },
    {
      surf: 1,
      type: '',              // 나머지는 빈값
      curvature: '',
      thickness: '',
      material: '',
      clearAperture: '',
    },
    {
      surf: 2,
      type: 'Image',         // 마지막은 Image로 prefill
      curvature: 0.0,
      thickness: 0.0,
      material: 'AIR',
      clearAperture: Infinity,
    },
  ]);

  const handleNewPage = () => {
    setLensTable([
      {
        surf: 0,
        type: 'Object',
        curvature: '0',
        thickness: Infinity,
        material: 'AIR',
        clearAperture: Infinity,
      },
      {
        surf: 1,
        type: '',
        curvature: '',
        thickness: '',
        material: '',
        clearAperture: '',
      },
      {
        surf: 2,
        type: 'Image',
        curvature: 0.0,
        thickness: 0.0,
        material: 'AIR',
        clearAperture: Infinity,
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

  // Image 바로 앞에 새 surface 추가
  const addSurface = () => {
    const image = lensTable[lensTable.length - 1]; // 마지막 Image
    const newSurface = {
      surf: 0, // 나중에 재계산
      type: '',
      curvature: '',
      thickness: '',
      material: '',
      clearAperture: '',
    };
    const newTable = [...lensTable.slice(0, -1), newSurface, image];
    
    // surf 번호 재계산
    const renumbered = newTable.map((row, idx) => ({ ...row, surf: idx }));
    setLensTable(renumbered);
  };

  // 마지막 surface 삭제 (Object, Image 제외)
  const deleteSurface = () => {
    // Object + 최소 1 surface + Image => lensTable.length <= 3이면 더 이상 삭제 불가
    if (lensTable.length <= 3) return;

    const object = lensTable[0];
    const image = lensTable[lensTable.length - 1];

    // Object와 Image를 제외한 나머지에서 마지막 하나 삭제
    const middleSurfaces = lensTable.slice(1, -1); // Object/Image 제외
    const newMiddle = middleSurfaces.slice(0, -1); // 마지막 하나 삭제

    const newTable = [object, ...newMiddle, image];

    // surf 번호 재계산
    const renumbered = newTable.map((row, idx) => ({ ...row, surf: idx }));
    setLensTable(renumbered);
  };


  const drawLens = async () => {
    // 렌즈 Layout만 그리는 코드
    setIsSimulationRunning(true);
    setRayTracePreview(null);
    try {
      const payload = {
        lensTable: lensTable.map(row => ({
          surf: row.surf,
          type: row.type || "",
          curvature: row.curvature === Infinity ? "Infinity" : String(row.curvature),
          thickness: row.thickness === Infinity ? "Infinity" : String(row.thickness),
          material: row.material || "",
          clearAperture: row.clearAperture === Infinity ? "Infinity" : String(row.clearAperture)
        }))
      };
      const response = await fetch(`${API_BASE_URL}/draw_lens`, {  // 필요하면 별도 엔드포인트
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Draw Lens failed");
      const data = await response.json();
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
            src={data.lens_img} // 또는 data.raytrace_img
            alt="Ray Trace Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      );
            
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulationRunning(false);
    }
  };

  const runRayTrace = async () => {
    setIsSimulationRunning(true);

    setRayTracePreview(null);
    setPsfPlot(null);
    setWavefrontPlot(null);
    setFieldPlot(null);

    try {
      const payload = {
        lensTable: lensTable.map(row => ({
          surf: row.surf,
          type: row.type || "",
          curvature: row.curvature === Infinity ? "Infinity" : String(row.curvature),
          thickness: row.thickness === Infinity ? "Infinity" : String(row.thickness),
          material: row.material || "",
          clearAperture: row.clearAperture === Infinity ? "Infinity" : String(row.clearAperture)
        }))
      };

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

    } catch (err) {
      console.error("Raytrace failed:", err);
    } finally {
      setIsSimulationRunning(false);
    }
  };

  
  const runAnalytics = async() => {
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
            ...iconButtonStyle}}
            // opacity: isSimulationRunning ? 0.5 : 1,
            // cursor: isSimulationRunning ? 'not-allowed' : 'pointer'}}
          // disabled={isSimulationRunning}
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
          onClick={drawLens}
          title="Draw Lens"
          style={{ ...iconButtonStyle}}
                  // opacity: isSimulationRunning ? 0.5 : 1,
                  // cursor: isSimulationRunning ? "not-allowed" : "pointer"}}
          // disabled={isSimulationRunning}
        >
          <img src={lens} alt="Add" style={{ width: 20, height: 20, imageRendering: 'auto' }} />
        </button>
        <button
          onClick={runRayTrace}
          title="Ray trace"
          style={{ ...iconButtonStyle}} 
                  // opacity: isSimulationRunning ? 0.5 : 1,
                  // cursor: isSimulationRunning ? "not-allowed" : "pointer"}}
          // disabled={isSimulationRunning}
        >
          <img src={raytrace} alt="Add" style={{ width: 20, height: 20 }} />
        </button>
        <button
          onClick={runAnalytics}
          title="Ray Trace & Analytics"
          style={{ ...iconButtonStyle}}
                  // opacity: isSimulationRunning ? 0.5 : 1,
                  // cursor: isSimulationRunning ? "not-allowed" : "pointer"}}
          // disabled={isSimulationRunning}
        >
          <img src={analytics} alt="Analytics" style={{ width: 20, height: 20 }} />
        </button>
        <button
          style={{ ...iconButtonStyle}}
          title="Export Lens Design to System Optimization menu"
        >
          <img src={upload} alt="Export" style={{ width: 20, height: 20 }} />
        </button>
        
        {/* <button
          title="Stop"
          style={{ ...iconButtonStyle}}
        >
          <img src={stop} alt="Stop" style={{ width: 20, height: 20 }} />
        </button> */}
        {/* <button
          title="Save"
          style={{ ...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed' }}
        >
          <img src={save} alt="Save" style={{ width: 20, height: 20 }} />
        </button> */}
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
                  <th style={{ width: '100px', padding: '6px 8px' }}>Curvature</th>
                  <th style={{ width: '100px', padding: '6px 8px' }}>Thickness</th>
                  <th style={{ width: '120px', padding: '6px 8px 6px 20px' }}>Material</th>
                  <th style={{ width: '100px', padding: '6px 8px' }}>Clear Aperture</th>
                </tr>
              </thead>
              <tbody>
                {lensTable.map((row, idx) => {
                  const isObject = idx === 0;
                  const isImage = idx === lensTable.length - 1;

                  return (
                    <tr key={idx}>
                      {/* Surf */}
                      <td style={{ padding: '4px 8px' }}>{row.surf}</td>

                      {/* Type */}
                      <td style={{ padding: '4px 8px' }}>
                        <select
                          value={row.type}
                          onChange={(e) => updateValue(idx, 'type', e.target.value)}
                          style={{ width: '110px', height: '28px' }}
                          disabled={isObject || isImage} // Object, Image 수정 불가
                        >
                          <option value=""></option>
                          <option value="Object">Object</option>
                          <option value="Refractive">Refractive</option>
                          <option value="Stop">Stop</option>
                          <option value="Image">Image</option>
                        </select>
                      </td>

                      {/* Curvature */}
                      <td style={{ padding: '4px 8px' }}>
                        <input
                          value={row.curvature}
                          onChange={(e) => updateValue(idx, 'curvature', e.target.value)}
                          style={{ width: '110px', height: '28px' }}
                          disabled={isObject || isImage} // Object, Image 수정 불가
                        />
                      </td>

                      {/* Thickness */}
                      <td style={{ padding: '4px 8px' }}>
                        <input
                          value={row.thickness}
                          onChange={(e) => updateValue(idx, 'thickness', e.target.value)}
                          style={{ width: '110px', height: '28px' }}
                          disabled={isImage} // Image 수정 불가, Object는 수정 가능
                        />
                      </td>

                      {/* Material */}
                      <td style={{ padding: '4px 8px 4px 20px' }}>
                        <select
                          value={row.material}
                          onChange={(e) => updateValue(idx, 'material', e.target.value)}
                          style={{ width: '110px', height: '28px' }}
                          disabled={isObject || isImage} // Object, Image 수정 불가
                        >
                          <option value=""></option>
                          <option value="AIR">AIR</option>
                          <option value="BK7">BK7</option>
                        </select>
                      </td>

                      {/* Clear Aperture */}
                      <td style={{ padding: '4px 8px' }}>
                        <input
                          value={row.clearAperture}
                          onChange={(e) => updateValue(idx, 'clearAperture', e.target.value)}
                          style={{ width: '110px', height: '28px' }}
                          disabled={isObject || isImage} // Object, Image 수정 불가
                        />
                      </td>
                    </tr>
                  );
                })}
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
