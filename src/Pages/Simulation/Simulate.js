import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/QblackAI_logo_black.png';
import sidebarIcon from '../../img/simulate/sidebar-left.svg';
import camera from '../../img/simulate/dslr-camera.png';
import lens from '../../img/simulate/optics.png';
import sensor from '../../img/simulate/microchip.png';
import newpage from '../../img/simulate/new-file.svg';
import run from '../../img/simulate/run.svg';
import save from '../../img/simulate/save.svg';
import back from '../../img/simulate/arrow-left.svg';
import forward from '../../img/simulate/arrow-right.svg';
import stop from '../../img/simulate/stop.svg';
import parameter from '../../img/simulate/parameter.svg';
import spectrum from '../../img/simulate/spectrum.svg';
import upload from '../../img/simulate/upload.svg';
import brightness from '../../img/simulate/brightness.svg';

const Simulate = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('System Optimization');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [logoHovered, setLogoHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(240);

  const [outputText, setOutputText] = useState([]);

  const menuItems = [
    { name: 'System Optimization', icon: camera },
    { name: 'Lens Design', icon: lens },
    { name: 'Sensor Design', icon: sensor },
  ];

  const menuRefs = useRef([]);
  const logoSize = 40;
  const toggleSize = 25;

  useEffect(() => {
    setSidebarWidth(sidebarExpanded ? 240 : 60);
  }, [sidebarExpanded]);

  const illuminants = ["", "Custom", "D50", "D55", "D65", "D75", "Illuminant A", "Illuminant B", "Illuminant C", "Fluorescent", "Tungsten"];
  const scenes = ["", "Macbeth", "Point Array", "Gridlines", "Slanted Edge", "Rings Rays"];
  const optics = ["", "Cooke Triplet", "Double-Gauss", "Fisheye", "WideAngle"];
  const sensors = ["", "Bayer-grbg", "Bayer-rggb", "Bayer-bggr", "Bayer-gbrg"];
  const isps = ["", "Fast-openISP"];
  const algorithms = ["", "DETR", "SAM1", "MiDaS"];

  const [sceneFile, setSceneFile] = useState('');
  const [opticsFile, setOpticsFile] = useState('');
  const [algorithmFile, setAlgorithmFile] = useState('');

  const sidebarStyle = {
    width: `${sidebarWidth}px`,
    backgroundColor: '#eee',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 10px',
    transition: 'width 0.3s',
    borderRight: '1px solid #ccc',
  };

  const sidebarHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    justifyContent: sidebarExpanded ? 'space-between' : 'center',
  };

  const logoContainerStyle = {
    width: `${logoSize}px`,
    height: `${logoSize}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const logoStyle = {
    width: `${logoSize}px`,
    height: `${logoSize}px`,
    objectFit: 'contain',
    borderRadius: '8px'
  };

  const toggleStyle = {
    width: `${toggleSize}px`,
    height: `${toggleSize}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const sidebarItemStyle = (active) => ({
    padding: '10px',
    marginBottom: '5px',
    cursor: 'pointer',
    borderRadius: '10px',
    backgroundColor: active ? '#ddd' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: sidebarExpanded ? 'flex-start' : 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '16px',
  });

  const iconStyle = {
    width: '24px',
    height: '24px',
    marginRight: sidebarExpanded ? '10px' : '0',
  };

  const mainContentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const topSectionStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px 20px',
    borderBottom: '1px solid #ccc',
  };

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    flex: '0 0 165px',
    height: '100%',
    justifyContent: 'flex-end',
  };

  const buttonRowStyle = {
    display: 'flex',
    gap: '8px',
  };

  const simulationAreaStyle = {
    display: 'flex',
    gap: '10px',
    width: 'calc(150px * 6 + 20px * 5)',
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: '100%',
    minWidth: '200px',
    maxWidth: '200px',
    padding: '0 5px',
    boxSizing: 'border-box',
  };

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

  const bottomSectionStyle = {
    flex: 1,
    display: 'flex',
  };

  const imageAreaStyle = {
    flex: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #ccc',
    backgroundColor: '#fff',
  };

  const textAreaStyle = {
    flex: 2,
    padding: '20px',
    backgroundColor: '#f9f9f9',
  };

  const handleLogoClick = () => {
    if (!sidebarExpanded) setSidebarExpanded(true);
    else navigate('/');
  };

  const selectStyle = {
    width: '100%',
    height: '28px',
    boxSizing: 'border-box',
    padding: '0 8px',
    minWidth: '80px',
    fontSize: '13px',
  };

  const fileInputRowStyle = {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  };

  const fileInputStyle = {
    flex: 1,
    height: '28px',
    boxSizing: 'border-box',
    padding: '0 8px',
    minWidth: '50px',
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={sidebarStyle}>
        <div style={sidebarHeaderStyle}>
          <div
            style={logoContainerStyle}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            onClick={handleLogoClick}
          >
            {!sidebarExpanded && logoHovered ? (
              <img src={sidebarIcon} alt="Expand" style={{ width: `${toggleSize}px`, height: `${toggleSize}px` }} />
            ) : (
              <img src={logo} alt="Logo" style={logoStyle} />
            )}
          </div>

          {sidebarExpanded && (
            <div style={toggleStyle} onClick={() => setSidebarExpanded(false)}>
              <img src={sidebarIcon} alt="Collapse" style={{ width: `${toggleSize}px`, height: `${toggleSize}px` }} />
            </div>
          )}
        </div>

        {menuItems.map((item, index) => (
          <div
            key={item.name}
            ref={(el) => (menuRefs.current[index] = el)}
            style={sidebarItemStyle(activeMenu === item.name)}
            onClick={() => setActiveMenu(item.name)}
          >
            <img src={item.icon} alt={item.name} style={iconStyle} />
            {sidebarExpanded && <span>{item.name}</span>}
          </div>
        ))}
      </div>

      <div style={mainContentStyle}>
        <div style={topSectionStyle}>
          <div style={buttonGroupStyle}>
            <div style={buttonRowStyle}>
              <button title="New" style={iconButtonStyle}>
                <img src={newpage} alt="New" style={{ width: 20, height: 20 }} />
              </button>
              <button title="Save" style={iconButtonStyle}>
                <img src={save} alt="Save" style={{ width: 20, height: 20 }} />
              </button>
              <button title="Back" style={iconButtonStyle}>
                <img src={back} alt="Back" style={{ width: 20, height: 20 }} />
              </button>
              <button title="Forward" style={iconButtonStyle}>
                <img src={forward} alt="Forward" style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <div style={buttonRowStyle}>
              <button title="Run" style={iconButtonStyle} onClick={() => setOutputText(prev => [...prev, "Start Simulation at " + new Date().toLocaleTimeString()])}>
                <img src={run} alt="Run" style={{ width: 20, height: 20 }} />
              </button>
              <button title="Stop" style={iconButtonStyle}>
                <img src={stop} alt="Stop" style={{ width: 20, height: 20 }} />
              </button>
              <button title="SFR" style={iconButtonStyle}>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>SFR</span>
              </button>
            </div>
          </div>

          <div style={simulationAreaStyle}>
            <div style={sectionStyle}>
              <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold'}}>Illuminant</label>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <select style={selectStyle}>{illuminants.map((ill, idx) => <option key={idx}>{ill}</option>)}</select>
                <button style={iconButtonStyle}>
                  <img src={parameter} alt="Params" style={{ width: '20px', height: '20px' }} />
                </button>
                <button style={iconButtonStyle}>
                  <img src={spectrum} alt="Spectrum" style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
            </div>

            <div style={sectionStyle}>
              <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold' }}>Scene</label>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <select style={selectStyle}>{scenes.map((s, idx) => <option key={idx}>{s}</option>)}</select>
                <button style={iconButtonStyle}>
                  <img src={parameter} alt="Params" style={{ width: '20px', height: '20px' }} />
                </button>
                <button style={iconButtonStyle}>
                  <img src={brightness} alt="Brightness" style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
              <div style={fileInputRowStyle}>
                <input
                  type="text"
                  value={sceneFile}
                  readOnly
                  placeholder=""
                  style={fileInputStyle}
                />
                <button style={iconButtonStyle} title="Upload">
                  <img src={upload} alt="Upload" style={{ width: 20, height: 20 }} />
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) =>
                      e.target.files.length > 0 && setSceneFile(e.target.files[0].name)
                    }
                  />
                </button>
              </div>
            </div>

            <div style={sectionStyle}>
              <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold' }}>Optics</label>
              <select style={selectStyle}>{optics.map((o, idx) => <option key={idx}>{o}</option>)}</select>
              <div style={fileInputRowStyle}>
                <input
                  type="text"
                  value={opticsFile}
                  readOnly
                  placeholder=""
                  style={fileInputStyle}
                />
                <button style={iconButtonStyle} title="Upload">
                  <img src={upload} alt="Upload" style={{ width: 20, height: 20 }}/>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) =>
                      e.target.files.length > 0 && setOpticsFile(e.target.files[0].name)
                    }
                  />
                </button>
              </div>
            </div>

            <div style={sectionStyle}>
              <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold' }}>Sensor</label>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <select style={selectStyle}>{sensors.map((s, idx) => <option key={idx}>{s}</option>)}</select>
                <button style={iconButtonStyle}>
                  <img src={parameter} alt="Params" style={{ width: '20px', height: '20px'}} />
                </button>
              </div>
            </div>

            <div style={sectionStyle}>
              <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold' }}>ISP</label>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <select style={selectStyle}>{isps.map((i, idx) => <option key={idx}>{i}</option>)}</select>
                <button style={iconButtonStyle}>
                  <img src={parameter} alt="Params" style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
            </div>

            <div style={sectionStyle}>
              <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold' }}>Algorithms</label>
              <select style={selectStyle}>{algorithms.map((a, idx) => <option key={idx}>{a}</option>)}</select>
              <div style={fileInputRowStyle}>
                <input
                  type="text"
                  value={algorithmFile}
                  readOnly
                  placeholder=""
                  style={fileInputStyle}
                />
                <button style={iconButtonStyle}>
                  <img src={upload} alt="Upload" style={{ width: 20, height: 20 }} />
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => e.target.files.length > 0 && setAlgorithmFile(e.target.files[0].name)}
                  />
                </button>
              </div>
            </div>

          </div>
        </div>

        <div style={bottomSectionStyle}>
          <div style={imageAreaStyle}>
            <span>Image Preview Area</span>
          </div>
          <div style={textAreaStyle}>
            {outputText.map((line, idx) => (
              <pre key={idx} style={{margin: 0}}>{line}</pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulate;
