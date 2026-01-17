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

const OpticsDesign = ({preset, onPresetConsumed, onExport}) => {
  // const DOUBLE_GAUSS_PRESET = [
  //   // 0 Object
  //   { surf: 0, type: 'Object', curvature: 0.0, thickness: Infinity, material: 'AIR', clearAperture: Infinity },

  //   // Lens 1
  //   { surf: 1, type: 'Refractive', curvature: 75.05, thickness: 9.0, material: 'BK7', clearAperture: 33.0 },
  //   { surf: 2, type: 'Refractive', curvature: 270.7, thickness: 0.1, material: 'AIR', clearAperture: 33.0 },

  //   // Lens 2
  //   { surf: 3, type: 'Refractive', curvature: 39.27, thickness: 16.51, material: 'BK7', clearAperture: 27.5 },
  //   { surf: 4, type: 'Refractive', curvature: 0.0, thickness: 0.1, material: 'AIR', clearAperture: 27.5 },

  //   // Lens 3
  //   { surf: 5, type: 'Refractive', curvature: 0.0, thickness: 2.0, material: 'BK7', clearAperture: 24.5 },
  //   { surf: 6, type: 'Refractive', curvature: 25.65, thickness: 10.99, material: 'AIR', clearAperture: 19.5 },

  //   // Stop
  //   { surf: 7, type: 'Stop', curvature: 0.0, thickness: 13.0, material: 'AIR', clearAperture: 18.0 },

  //   // Lens 4
  //   { surf: 8, type: 'Refractive', curvature: -31.87, thickness: 7.03, material: 'BK7', clearAperture: 16.5 },
  //   { surf: 9, type: 'Refractive', curvature: 0.0, thickness: 0.1, material: 'AIR', clearAperture: 18.5 },

  //   // Lens 5
  //   { surf: 10, type: 'Refractive', curvature: 0.0, thickness: 8.98, material: 'BK7', clearAperture: 21.0 },
  //   { surf: 11, type: 'Refractive', curvature: -43.51, thickness: 0.1, material: 'AIR', clearAperture: 21.0 },

  //   // Lens 6
  //   { surf: 12, type: 'Refractive', curvature: 221.14, thickness: 7.98, material: 'BK7', clearAperture: 23.0 },
  //   { surf: 13, type: 'Refractive', curvature: -88.79, thickness: 61.42, material: 'AIR', clearAperture: 23.0 },

  //   // Image
  //   { surf: 14, type: 'Image', curvature: 0.0, thickness: 0.0, material: 'AIR', clearAperture: Infinity },
  // ];

  const DOUBLE_GAUSS_PRESET = [
    // 0 Object
    { surf: 0, type: 'Object', curvature: 0.0, thickness: Infinity, material: 'AIR', clearAperture: Infinity },

    // -------- Lens 1 --------
    { surf: 1, type: 'Refractive', curvature: 75.05, thickness: 9.0, material: 'N-BK7', clearAperture: 33.0 },
    { surf: 2, type: 'Refractive', curvature: 270.7, thickness: 0.1, material: 'AIR',   clearAperture: 33.0 },

    // -------- Lens 2 --------
    { surf: 3, type: 'Refractive', curvature: 39.27, thickness: 16.51, material: 'N-BK7', clearAperture: 27.5 },
    { surf: 4, type: 'Refractive', curvature: 0.0,   thickness: 0.1,   material: 'AIR',   clearAperture: 27.5 },

    // -------- Lens 3 --------
    { surf: 5, type: 'Refractive', curvature: 0.0,   thickness: 2.0,   material: 'N-BK7', clearAperture: 24.5 },
    { surf: 6, type: 'Refractive', curvature: 25.65, thickness: 15.99, material: 'AIR',   clearAperture: 19.5 },

    // -------- Stop --------
    { surf: 7, type: 'Stop', curvature: 0.0, thickness: 13.0, material: 'AIR', clearAperture: 10.0 },

    // -------- Lens 4 --------
    { surf: 8, type: 'Refractive', curvature: -31.87, thickness: 7.03, material: 'N-BK7', clearAperture: 16.5 },
    { surf: 9, type: 'Refractive', curvature: 0.0,    thickness: 0.1,  material: 'AIR',   clearAperture: 18.5 },

    // -------- Lens 5 --------
    { surf: 10, type: 'Refractive', curvature: 0.0,    thickness: 8.98, material: 'N-BK7', clearAperture: 21.0 },
    { surf: 11, type: 'Refractive', curvature: -43.51, thickness: 0.1,  material: 'AIR',   clearAperture: 21.0 },

    // -------- Lens 6 --------
    { surf: 12, type: 'Refractive', curvature: 221.14, thickness: 7.98, material: 'N-BK7', clearAperture: 23.0 },
    { surf: 13, type: 'Refractive', curvature: -42.79, thickness: 61.42, material: 'AIR',  clearAperture: 23.0 },

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


  const TabBarStyle = {
    display: "flex",
    gap: "16px",
    borderBottom: "1px solid #e0e0e0",
    marginBottom: "8px",
  };

  const TabStyle = {
    fontSize: "13px",
    padding: "6px 2px",
    cursor: "pointer",
    color: "#777",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease",
  };

  const TabActiveStyle = {
    color: "#1976d2",               // Zemax-ish blue
    borderBottom: "2px solid #1976d2",
    fontWeight: 500,
  };

  const DisabledStyle = {
    fontSize: "12px",
    color: "#aaa",
    fontStyle: "italic",
  };

  const [expanded, setExpanded] = useState(true);

  const [isDrawLensRunning, setIsDrawLensRunning] = useState(false);
  const [isRaytraceRunning, setIsRaytraceRunning] = useState(false);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [rayTracePreview, setRayTracePreview] = useState(null);

  const [wavefrontTab, setWavefrontTab] = useState("0F");
  const [psfTab, setPsfTab] = useState("0F");
  const [mtfTab, setMtfTab] = useState("0F");

  const emptyPlots = {"0F": null, "0.7F": null, "1F": null};
  const [wavefrontPlot, setWavefrontPlot] = useState(emptyPlots);
  const [psfPlot, setPsfPlot] = useState(emptyPlots);
  const [mtfPlot, setMtfPlot] = useState(emptyPlots);

  const [analyticsData, setAnalyticsData] = useState(null);

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

    setFields([0, 10, 14]);
    setWavelengths([0.4861, 0.5876, 0.6563]);
    
    setIsDrawLensRunning(false);
    setIsRaytraceRunning(false);
    setIsSimulationRunning(false);
    setPsfPlot(emptyPlots);
    setWavefrontPlot(emptyPlots);
    setMtfPlot(emptyPlots);
    setRayTracePreview(null);
  };

  const [fields, setFields] = useState([0, 10, 14]);
  const [wavelengths, setWavelengths] = useState([0.4861, 0.5876, 0.6563]);
  const [fieldOpen, setFieldOpen] = useState(true);
  const [wavelengthOpen, setWavelengthOpen] = useState(true);


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
    setRayTracePreview(null);
    setPsfPlot(emptyPlots);
    setWavefrontPlot(emptyPlots);
    setMtfPlot(emptyPlots);

    // 렌즈 Layout만 그리는 코드
    setIsDrawLensRunning(true);
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
        })),

        system: {
          fields: fields
            .filter(v => v !=="" && v !== null)
            .map(v => ({angle: Number(v), weight: 1.0})),
          
          wavelengths: wavelengths
            .filter(v => v !=="" && v !== null)
            .map(v => Number(v))
        }
      };
      const response = await fetch(`${API_BASE_URL}/draw_lens`, {  // 필요하면 별도 엔드포인트
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        let errorMessage = "Lens drawing failed";

        try {
          const errData = await response.json();
          if (errData.detail) errorMessage = errData.detail;
        } catch (_) {}

        throw new Error(errorMessage);
      }

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

      if (data.warnings && data.warnings.length > 0) {
        setTimeout(() => {
          alert(
            "⚠️ Error: Invalid surface parameter\n\n" +
            data.warnings.join("\n\n")
          );
        }, 0);
      }
            
    } catch (err) {
      console.error(err);
    } finally {
      setIsDrawLensRunning(false);
    }
  };

  const runRayTrace = async () => {
    setIsRaytraceRunning(true);

    setRayTracePreview(null);
    setPsfPlot(emptyPlots);
    setWavefrontPlot(emptyPlots);
    setMtfPlot(emptyPlots);

    try {
      const payload = {
        lensTable: lensTable.map(row => ({
          surf: row.surf,
          type: row.type || "",
          curvature: row.curvature === Infinity ? "Infinity" : String(row.curvature),
          thickness: row.thickness === Infinity ? "Infinity" : String(row.thickness),
          material: row.material || "",
          clearAperture: row.clearAperture === Infinity ? "Infinity" : String(row.clearAperture)
        })), 

        system: {
          fields: fields
            .filter(v => v !=="" && v !== null)
            .map(v => ({angle: Number(v), weight: 1.0})),
          
          wavelengths: wavelengths
            .filter(v => v !=="" && v !== null)
            .map(v => Number(v))
        }
      };
      console.log(payload);

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

      if (data.warnings && data.warnings.length > 0) {
        setTimeout(() => {
          alert(
            "⚠️ Error: Invalid surface parameter\n\n" +
            data.warnings.join("\n\n")
          );
        }, 0);
      }

    } catch (err) {
      console.error("Raytrace failed:", err);
    } finally {
      setIsRaytraceRunning(false);
    }
  };

  
  const runAnalytics = async() => {
    setIsSimulationRunning(true);

    setRayTracePreview(null);
    setPsfPlot(emptyPlots);
    setWavefrontPlot(emptyPlots);
    setMtfPlot(emptyPlots);

    try {
      const payload = {
        lensTable: lensTable.map(row => ({
          surf: row.surf,
          type: row.type || "",
          curvature: row.curvature === Infinity ? "Infinity" : String(row.curvature),
          thickness: row.thickness === Infinity ? "Infinity" : String(row.thickness),
          material: row.material || "",
          clearAperture: row.clearAperture === Infinity ? "Infinity" : String(row.clearAperture)
        })),

        system: {
          fields: fields
            .filter(v => v !=="" && v !== null)
            .map(v => ({angle: Number(v), weight: 1.0})),
          
          wavelengths: wavelengths
            .filter(v => v !=="" && v !== null)
            .map(v => Number(v))
        }
      };

      const response = await fetch(`${API_BASE_URL}/runanalytics`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to run raytrace");

      const data = await response.json();

      // -------------------------------
      // 1. Raytrace (type === raytrace)
      // -------------------------------
      const raytrace = data.find(d => d.type === "raytrace");

      if (raytrace) {
        setRayTracePreview(
          <img
            src={raytrace.image}
            alt="Ray Trace"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        );
      } 
      
      // -------------------------------
      // 2. Summary
      // -------------------------------
      const summary = data.find(d => d.type === "summary")?.data;
      if (summary) {
        setAnalyticsData(summary);
      }


      // -------------------------------
      // 3. Wavefront, PSF, MTF
      // -------------------------------
      const wf = { ...emptyPlots };
      const psf = { ...emptyPlots };
      const mtf = { ...emptyPlots };

      data.forEach(d => {
        if (d.field === null) return;

        const tab = d.field;

        const img = (
          <img
            src={d.image}
            alt={`${d.type} ${tab}`}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        );

        if (d.type === "wavefront") wf[tab] = img;
        if (d.type === "psf")       psf[tab] = img;
        if (d.type === "mtf")       mtf[tab] = img;
      });

      setWavefrontPlot(wf);
      setPsfPlot(psf);
      setMtfPlot(mtf);

    } catch (err) {
      console.error("Raytrace failed:", err);
    } finally {
      setIsSimulationRunning(false);
    }
  };

  const exportDesign = () => {
    // Wavefront 결과 체크 (0F 기준)
    if (!wavefrontPlot || !wavefrontPlot["0F"]) {
      alert("Please run Ray Trace & Analytics for lens design export");
      return;
    }

    // 파일 이름 입력
    const filename = prompt("Enter optics file name");
    if (!filename) return;

    if (!analyticsData){
      alert("No analytics data to export");
      return;
    }

    // 부모로 파일 이름과 데이터 전달
    onExport({
      filename,
      analytics: analyticsData
    });
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
            cursor: isSimulationRunning ? 'not-allowed' : 'pointer'}}
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
          onClick={drawLens}
          title="Draw Lens"
          style={{ ...iconButtonStyle,
                  opacity: isDrawLensRunning ? 0.5 : 1,
                  cursor: isDrawLensRunning ? "not-allowed" : "pointer"}}
          disabled={isDrawLensRunning}
        >
          <img src={lens} alt="Add" style={{ width: 20, height: 20, imageRendering: 'auto' }} />
        </button>
        <button
          onClick={runRayTrace}
          title="Ray trace"
          style={{ ...iconButtonStyle, 
                  opacity: isRaytraceRunning ? 0.5 : 1,
                  cursor: isRaytraceRunning ? "not-allowed" : "pointer"}}
          disabled={isRaytraceRunning}
        >
          <img src={raytrace} alt="Add" style={{ width: 20, height: 20 }} />
        </button>
        <button
          onClick={runAnalytics}
          title="Ray Trace & Analytics"
          style={{ ...iconButtonStyle,
                  opacity: isSimulationRunning ? 0.5 : 1,
                  cursor: isSimulationRunning ? "not-allowed" : "pointer"}}
          disabled={isSimulationRunning}
        >
          <img src={analytics} alt="Analytics" style={{ width: 20, height: 20 }} />
        </button>
        <button
          onClick={exportDesign}
          style={{ ...iconButtonStyle}}
          title="Export Lens Design to System Optimization menu"
          // disabled
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
      
      <div
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* System Explorer */}
        <div
          style={{
            width: expanded ? 200 : 40,
            transition: "width 0.25s",
            borderRight: "1px solid #ccc",
            background: "#fafafa",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* ================= HEADER ================= */}
          {expanded && (
            <div
              style={{
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 10px",
                borderBottom: "1px solid #ccc",
                background: "#eee",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                System Explorer
              </div>

              <button
                onClick={() => setExpanded(false)}
                title="Collapse"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: 14,
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                ◀
              </button>
            </div>
          )}

          {/* ================= COLLAPSED LABEL ================= */}
          {!expanded && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 12,
                gap: 10,
              }}
            >
              {/* Vertical label */}
              <div
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#555",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                System Explorer
              </div>

              {/* Expand arrow BELOW text */}
              <button
                onClick={() => setExpanded(true)}
                title="Expand"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: 14,
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                ▶
              </button>
            </div>
          )}

          {/* ================= CONTENT ================= */}
          {expanded && (
            <div
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                fontSize: 13,
              }}
            >
              {/* ================= FIELD ================= */}
              <div>
                {/* Header */}
                <div
                  onClick={() => setFieldOpen(!fieldOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    fontWeight: 600,
                    userSelect: "none",
                  }}
                >
                  <span style={{ fontSize: 14 }}>
                    {fieldOpen ? "▾" : "▸"}
                  </span>
                  <span>Field (°)</span>
                </div>


                {/* Body */}
                {fieldOpen && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      marginTop: 6,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <input
                        key={i}
                        type="number"
                        value={fields[i]}
                        onChange={(e) => {
                          const v = [...fields];
                          v[i] = e.target.value;
                          setFields(v);
                        }}
                        style={{ width: "100%" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* ================= WAVELENGTH ================= */}
              <div>
                {/* Header */}
                <div
                  onClick={() => setWavelengthOpen(!wavelengthOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    fontWeight: 600,
                    userSelect: "none",
                  }}
                >
                  <span style={{ fontSize: 14 }}>
                    {wavelengthOpen ? "▾" : "▸"}
                  </span>
                  <span>Wavelength (um)</span>
                </div>


                {/* Body */}
                {wavelengthOpen && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      marginTop: 6,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <input
                        key={i}
                        type="number"
                        value={wavelengths[i]}
                        onChange={(e) => {
                          const v = [...wavelengths];
                          v[i] = e.target.value;
                          setWavelengths(v);
                        }}
                        style={{ width: "100%" }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}


        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Lens Table */}
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
              <h6 style={{ marginBottom: '6px' }}>Lens Data</h6>

              {/* Lens Table */}
              <div
                style={{
                  flex: 1,
                  overflowX: 'auto',
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
                      <th style={{ width: '50px', padding: '6px 8px', fontWeight: 500 }}>Surf</th>
                      <th style={{ width: '110px', padding: '6px 8px', fontWeight: 500 }}>Type</th>
                      <th style={{ width: '110px', padding: '6px 8px', fontWeight: 500 }}>Curvature (mm)</th>
                      <th style={{ width: '110px', padding: '6px 8px', fontWeight: 500 }}>Thickness (mm)</th>
                      <th style={{ width: '110px', padding: '6px 8px', fontWeight: 500 }}>Material</th>
                      <th style={{ width: '110px', padding: '6px 8px', fontWeight: 500 }}>Clear Aperture (mm)</th>
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
                              style={{ width: '100%', height: '28px', boxSizing: 'border-box' }}
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
                              style={{ width: '100%', height: '28px' }}
                              disabled={isObject || isImage} // Object, Image 수정 불가
                            />
                          </td>

                          {/* Thickness */}
                          <td style={{ padding: '4px 8px' }}>
                            <input
                              value={row.thickness}
                              onChange={(e) => updateValue(idx, 'thickness', e.target.value)}
                              style={{ width: '100%', height: '28px' }}
                              disabled={isObject || isImage} // Image 수정 불가, Object는 수정 가능. 현재는 둘다 불가
                            />
                          </td>

                          {/* Material */}
                          <td style={{ padding: '4px 8px ' }}>
                            <select
                              value={row.material}
                              onChange={(e) => updateValue(idx, 'material', e.target.value)}
                              onMouseDown={(e) => e.currentTarget.classList.add('open')}
                              onBlur={(e) => e.currentTarget.classList.remove('open')}
                              className="material-select"
                              style={{ width: '100%', height: '28px' }}
                              disabled={isObject || isImage}
                            >
                              <option value=""></option>

                              {/* Air */}
                              <option value="AIR">AIR</option>

                              {/* Crown glasses */}
                              <option value="N-BK7">N-BK7</option>
                              <option value="N-BAK4">N-BAK4</option>
                              <option value="N-K5">N-K5</option>

                              {/* Flint glasses */}
                              <option value="N-SF5">N-SF5</option>
                              <option value="N-SF10">N-SF10</option>
                              <option value="N-SF11">N-SF11</option>

                              {/* Special */}
                              <option value="FUSED_SILICA">FUSED SILICA</option>
                              <option value="CAF2">CaF2</option>
                            </select>
                          </td>

                          {/* Clear Aperture */}
                          <td style={{ padding: '4px 8px' }}>
                            <input
                              value={row.clearAperture}
                              onChange={(e) => updateValue(idx, 'clearAperture', e.target.value)}
                              style={{ width: '100%', height: '28px' }}
                              disabled={isObject || isImage} // Object, Image 수정 불가
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
              <h6 style={{ margin: '4px 0 6px 4px' }}>Lens Layout</h6>
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

            {/* Wavefront Map */}
            <div style={plotBoxStyle}>
              <h5 style={plotTitleRowStyle}>Wavefront Map</h5>

              <div style={TabBarStyle}>
                {["0F", "0.7F", "1F"].map(tab => (
                  <div
                    key={tab}
                    onClick={() => setWavefrontTab(tab)}
                    style={{
                      ...TabStyle,
                      ...(wavefrontTab === tab ? TabActiveStyle : {})
                    }}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              <div style={plotContentStyle}>
                {wavefrontPlot[wavefrontTab] || <div style={DisabledStyle}></div>}
              </div>
            </div>


            {/* PSF Plot */}
            <div style={plotBoxStyle}>
              <h5 style={plotTitleRowStyle}>PSF Plot</h5>

              {/* Tabs */}
              <div style={TabBarStyle}>
                {["0F", "0.7F", "1F"].map(tab => (
                  <div
                    key={tab}
                    onClick={() => setPsfTab(tab)}
                    style={{
                      ...TabStyle,
                      ...(psfTab === tab ? TabActiveStyle : {})
                    }}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div style={plotContentStyle}>
                {psfPlot[psfTab] || <div style={DisabledStyle}></div>}
              </div>
            </div>


            {/* MTF Plot */}
            <div style={plotBoxStyle}>
              <h5 style={plotTitleRowStyle}>MTF</h5>

              {/* Tabs */}
              <div style={TabBarStyle}>
                {["0F", "0.7F", "1F"].map(tab => (
                  <div
                    key={tab}
                    onClick={() => setMtfTab(tab)}
                    style={{
                      ...TabStyle,
                      ...(mtfTab === tab ? TabActiveStyle : {})
                    }}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div style={plotContentStyle}>
                {mtfPlot[mtfTab] || <div style={DisabledStyle}></div>}
              </div>
            </div>
          </div>
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
  // fontWeight: 600,
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
